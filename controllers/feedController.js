const { validationResult } = require("express-validator");
const Post = require('../models/post');

//Ao posts, mandar aos poucos, ou seja, com paginação
exports.getPosts = (req, res, next) => {

    const page = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItems;

    Post.find()
        .countDocuments()
        .then(total => {
            totalItems = total;

            return Post.find()
                .skip((page - 1) * perPage)
                .limit(perPage);
        })
        .then(result => {
            res.status(200).json({
                totalItems: totalItems,
                posts: result
            })
        })
        .catch(error => {
            console.log(error);
        })

}

exports.createPost = (req, res, next) => {

    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(422).send({
            error: true,
            message: errors.array()[0].msg
        });
    }

    console.log("Aqui...")
    console.log(req.file)

    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.file.path;

    const postagem = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
    })

    //Add este post ao DB
    postagem.save()
        .then(result => {
            res.status(201).json({
                error: false,
                message: "Post criado com sucesso!!"
            })
        })
}

//Rotas para atualizar e deletar um post

exports.updatePost = (req, res, next) => {
    const postId = req.params.postID;
    //Buscar no DB
    console.log(postId);
    res.status(200).json({
        msg: "Post atualizado com sucesso!",
        post: postId
    });
}

exports.deletePost = async (req, res, next) => {
    const postID = req.params.postID;
    //Buscar no DB
    console.log(postID);

    try{
        const deletedPost = await Post.findByIdAndDelete(postID)

        if(!deletedPost){
            return res.status(404).json({
                msg: "Post não encontrado."
            });
        }

        res.status(200).json({
            msg: "Post excluído com sucesso!",
            post: deletedPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Erro ao excluir o post."
        });
    }
   /*  res.status(200).json({
        msg: "Post excluído com sucesso!",
        post: postID
    }); */
}