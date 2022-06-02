const {
    deepEqual,
    ok
} = require('assert')
const database = require('./database')


const DEFAULT_ITEM_CADASTRAR = {
    nome: "Flash",
    poder: "Speed",
    id: 1
}
const DEFAULT_ITEM_ATUALIZAR = {
    nome: "Batman",
    poder: "Rico",
    id: 2
}

describe('Switch de manipulação de Herói', () => {
    before(async ()=>{
       await database.cadastrar(DEFAULT_ITEM_CADASTRAR) 
       await database.cadastrar(DEFAULT_ITEM_ATUALIZAR) 
    })
    it('Deve pesquisar um heroi usando arquivos', async()=>{
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)
        deepEqual(resultado,expected)
    })
    it('Deve cadastrar um heroi usando Arquivos', async()=>{
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(actual,expected)
        
    })
    it('Deve remover um heroi por Id', async()=>{
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado,expected)
    })
    it('Deve atualizar um heroi por uma Id', async()=>{
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: "Robert Pattinson",
            poder: "Melhor Batman"
        }
        const novoDado = {
            nome: "Robert Pattinson",
            poder: "Melhor Batman"
        }
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id,novoDado)
        const [resultado] =  await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(resultado, expected)
    })
})