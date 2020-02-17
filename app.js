var app = new Vue({
    el:"#root",
    data:{
        showingAddModal:false,
        showingEditModal:false,
        showingDeleteModal:false,
        errorMessage:"",
        sucessMessage:"",
        usuario:[],
        newUsuario:{username:"",email:"",mobile:""},
        clickedUsuario:{}
    },
    mounted: function(){
        console.log("mounted");
        this.getAllUsuario();
    },
    methods:{
        getAllUsuario: function(){
            axios.get("http://localhost/CRUDVUE/api.php?action=read")
            .then(function(response){
                //console.log(response);
                if(response.data.error){
                    app.errorMessage = response.data.message;
                }else{
                    app.usuario = response.data.usuario;
                }
            });
        },
        saveUsuario: function(){
            //console.log(app.newUsuario);
            var formData = app.toFormData(app.newUsuario);

            axios.post("http://localhost/CRUDVUE/api.php?action=create", formData)
            .then(function(response){
                //console.log(response);
                app.newUsuario = {username:"",email:"",mobile:""};
                if(response.data.error){
                    app.errorMessage = response.data.message;
                }else{
                    app.sucessMessage = response.data.message;
                    app.getAllUsuario();
                }
            });
        },
        updateUsuario: function(){
            //console.log(app.newUsuario);
            var formData = app.toFormData(app.clickedUsuario);

            axios.post("http://localhost/CRUDVUE/api.php?action=update", formData)
            .then(function(response){
                //console.log(response);
                app.clickedUsuario = {};
                if(response.data.error){
                    app.errorMessage = response.data.message;
                }else{
                    app.sucessMessage = response.data.message;
                    app.getAllUsuario();
                }
            });
        },
        deleteUsuario: function(){
            //console.log(app.newUsuario);
            var formData = app.toFormData(app.clickedUsuario);

            axios.post("http://localhost/CRUDVUE/api.php?action=delete", formData)
            .then(function(response){
                //console.log(response);
                app.clickedUsuario = {};
                if(response.data.error){
                    app.errorMessage = response.data.message;
                }else{
                    app.sucessMessage = response.data.message;
                    app.getAllUsuario();
                }
            });
        },


        selectUsuario(usuario){
            app.clickedUsuario = usuario;
        },

        toFormData: function(obj){
            var form_data = new FormData();
            for (var key in obj){
                form_data.append(key, obj[key]);
            }
            return form_data;
        },
        clearMessage: function(){
            app.errorMessage = "";
            app.sucessMessage = "";
        }
    }
});