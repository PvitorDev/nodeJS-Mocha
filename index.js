const {Command} = require('commander')
const Database = require("./database.js")
const Heroi = require("./heroi")

async function main() {
    const program = new Command()
    program
        .version("v1")
        .option("-n, --nome [value]", "Nome do Heroi")
        .option("-p, --poder [value]", "Poder do Heroi")
        .option("-i, --id [value]", "Id do Heroi")
        .option("-c, --cadastrar", "Cadastrar um Heroi")
        .option("-l, --listar", "Listar Herois")
        .option("-r, --remover", "Remove um Heroi")
        .option("-a, --atualizar [value]", "Atualiza um Heroi")

    program.parse(process.argv)
    const options = program.opts()
    const heroi = new Heroi(options)
    try {
        //Cadastrar
        if (options.cadastrar) {
            delete heroi.id
            const resultado = await Database.cadastrar(heroi);
            if (!resultado) {
                console.error("HEROI NÃO FOI CADASTRADO")
                return
            }
            console.log("Heroi Cadastro com Sucesso")
        }
        //Listar 
        if (options.listar) {
            const resultado = await Database.listar();
            console.log(resultado)
            return
        }
        //Remover
        if (options.remover) {
            const resultado = Database.remover(heroi.id)

            if (!resultado) {
                console.error("Não foi possível remover o Heroi");
                return;
            }
            console.log("Heroi removido com sucesso");
        }
        //Atualizar 
        if(options.atualizar){
            const idParaAtualizar = parseInt(options.atualizar)
            delete heroi.id
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
            if(!resultado){
                console.error("Não foi possivel atualizar o Heroi")
                return
            }
            console.log("Heroi Atualizado com Sucesso")
        }
    } catch (error) {
        console.error("Deu Xabu", error)
    }
}
main()