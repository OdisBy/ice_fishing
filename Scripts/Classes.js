class Obj{
    frame = 1;
    timer = 0;
    pescado = false;
    coletado = false;

    tiposPossiveisObjeto = ["Peixes", "Lixos", "Inimigos", "Minhocas"];
    peixesPossiveis = ["Salmao", "Tilapia", "Pacu"]
    lixosPossiveis = ["Bota"]
    inimigosPossiveis = ["Tubarao", "Caranguejo"]
    minhocasPossiveis = ["Lata"]

    constructor(x, y, width, height, velocidade, image){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocidade = velocidade;
        this.image = image;
    }
    desenha(){
        var img = new Image();
        img.src = this.image;
        pincel.drawImage(img, this.x, this.y, this.width, this.height);
    }

    animation(name){
        this.timer += 1;
        if(this.timer > 10){
            this.timer = 0;
            this.frame += 1;
        }
        if(this.frame > 4){
            this.frame = 1;
        }
        this.image = "Assets/" + name + this.frame + ".png";
    }

    movement(){
        this.x += this.velocidade;
    }

    peixePescado(x, y, imagemPescado){
        var img = new Image();
        img.src = imagemPescado
        pincel.drawImage(img, x, y+20, this.height, this.width);
    }

}

class Img{
    constructor(x, y, width, height, image){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }
    desenha(){
        var img = new Image();
        img.src = this.image;
        pincel.drawImage(img, this.x, this.y, this.width, this.height);
    }
}

class Player extends Obj{
    lifes = 3
    peixesPescados = 0
    timer = 300
    iscas = 3
}

class LinhaVaraPesca extends Obj{
    velocidade = 1
    // image = "Assets/linha.png"

    collide(obj){   
        if(this.x < obj.x + obj.width &&
            this.x + obj.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + obj.height > obj.y
            ){
                return true;
            }else{
                return false;
            }

        
    }
    

    mudaTamanho(aumenta){
        if(aumenta){
            if(this.height >= 150){
                
                this.height -= 10 * this.velocidade
                this.y += 1
            }
        }else{
            if(this.height <= 700){
                this.height += 10 * this.velocidade
                
                this.y -= 1
            } 
        }
    }   
}

class Isca extends Obj{
    // image = "Assets/minhoca.png"

    

    collide(obj) {
        if (this.x < obj.x + obj.width &&
            this.x + obj.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + obj.height > obj.y
        ) {
            return true;
        } else {
            return false;
        }
    }
}

class Salmao extends Obj{
    speed = 40;
    tipoObj = this.tiposPossiveisObjeto[0]
    objetoNome = this.peixesPossiveis[0]

    imgPescado = "Assets/salmaoPescado.png"

}

class Tilapia extends Obj{
    speed = 30;
    tipoObj = this.tiposPossiveisObjeto[0]
    objetoNome = this.peixesPossiveis[1]

    imgPescado = "Assets/tilapiaPescado.png"
}

class Pacu extends Obj{
    speed = 40;
    tipoObj = this.tiposPossiveisObjeto[0]
    objetoNome = this.peixesPossiveis[2]

    imgPescado = "Assets/pacuPescado.png"
}

class Bota extends Obj{
    speed = 40;
    tipoObj = this.tiposPossiveisObjeto[1]
    objetoNome = this.lixosPossiveis[0]

    imgPescado = "Assets/bota.png"
}

class Tubarao extends Obj{
    speed = 40;
    tipoObj = this.tiposPossiveisObjeto[2]
    objetoNome = this.inimigosPossiveis[0]
}

class Caranguejo extends Obj{
    speed = 40;
    tipoObj = this.tiposPossiveisObjeto[2]
    objetoNome = this.inimigosPossiveis[1]
}

class lataMinhoca extends Obj{
    speed = 40;
    tipoObj = this.tiposPossiveisObjeto[3]
    objetoNome = this.minhocasPossiveis[0]

    imgPescado = "Assets/lataMinhoca.png"
}

