
import fs from 'fs';

function arquivoParaJson(endereco){
    let arquivo =  fs.readFileSync(endereco);
    let arquivoParseado = JSON.parse(arquivo);
    return arquivoParseado;
}
function obterEstados(){
    let estados = arquivoParaJson('./data/Estados.json');
    return estados  ; 
}

function obterCidades(){
    let cidades = arquivoParaJson('./data/Cidades.json');
    return cidades  ; 
}

/*
Implementar um método que irá criar um arquivo JSON para cada estado representado no arquivo Estados.json, 
e o seu conteúdo será um array das cidades pertencentes aquele estado, de acordo com o arquivo Cidades.json. 
O nome do arquivo deve ser o UF do estado, por exemplo: MG.json.
*/
function cidadePorEstado(){
    let estados = obterEstados();
    let cidades = obterCidades();

    estados.forEach(estado => {
        //console.log(estado.Sigla)
        let filtradas = cidades.filter((cidade)=>cidade.Estado ===estado.ID)
        //console.log(filtradas);

        fs.writeFileSync(`./data/estados/${estado.Sigla}.json`, JSON.stringify(filtradas));
    });
}

/*
Criar um método que recebe como parâmetro o UF do estado, realize a leitura do arquivo JSON correspondente e 
retorne a quantidade de cidades daquele estado. 
*/
function quantidadeCidadesPorEstado(uf){
    
    let cidades =  arquivoParaJson(`./data/estados/${uf}.json`);
    return cidades.length
}

/*
Criar um método que imprima no console um array com o UF dos cinco estados que mais possuem cidades, 
seguidos da quantidade, em ordem decrescente. Utilize o método criado no tópico anterior. 
Exemplo de impressão: [“UF - 93”, “UF - 82”, “UF - 74”, “UF - 72”, “UF - 65”]
*/
function possuemMaisCidades(){

    let quantidadePorEstado = cidadesPorEstado()


    console.log(
        quantidadePorEstado.sort(
                (a,b) => (a.quantidade < b.quantidade) ? 1 : ((b.quantidade < a.quantidade) ? -1 : 0)
            ).slice(0,5)
        );

}

/*
Criar um método que imprima no console um array com o UF dos cinco estados que menos possuem cidades, 
seguidos da quantidade, em ordem decrescente. Utilize o método criado no tópico anterior. 
Exemplo de impressão: [“UF - 30”, “UF - 27”, “UF - 25”, “UF - 23”, “UF - 21”]
*/
function possuemMenosCidades(){
    let quantidadePorEstado = cidadesPorEstado()


    console.log(
        quantidadePorEstado.sort(
                (a,b) => (a.quantidade > b.quantidade) ? 1 : ((b.quantidade > a.quantidade) ? -1 : 0)
            ).slice(0,5)
        );
}

function cidadesPorEstado(){
    let estados = obterEstados();
    let cidades = obterCidades();

    let quantidadePorEstado = [{sigla:"",quantidade:0}]

    quantidadePorEstado.pop();

    estados.forEach(estado => {

        quantidadePorEstado.push({ "sigla": estado.Sigla,"quantidade":quantidadeCidadesPorEstado(estado.Sigla)})
        
    });

    return quantidadePorEstado
}


/*
Criar um método que imprima no console um array com a cidade de maior nome de cada estado, seguida de seu UF. 
Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro. 
Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].
*/

function CidadeMaiorNome(){
    let estados = obterEstados();
    let cidades = obterCidades();

    let maioresNomes = [{sigla:"",nome:"0"}]

    maioresNomes.pop();

    estados.forEach(estado => {

        let cidadesDoEstado = cidades.filter((cidade)=>cidade.Estado ===estado.ID)

        let maiorNome = cidadesDoEstado.sort(
                (a,b) => (a.Nome.length < b.Nome.length) ? 1 : ((b.Nome.length < a.Nome.length) ? -1 : 0)
            ).slice(0,1)

            maioresNomes.push({"sigla":estado.Sigla, "nome": maiorNome[0].Nome})

    });

    console.log (maioresNomes);
}


/*
Criar um método que imprima no console um array com a cidade de menor nome de cada estado, seguida de seu UF. 
Em caso de empate, considerar a ordem alfabética para ordená-los e então retorne o primeiro. 
Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].
*/

function CidadeMenorNome(){
    let estados = obterEstados();
    let cidades = obterCidades();

    let menoresNomes = [{nome:"0", sigla:""}]

    menoresNomes.pop();

    estados.forEach(estado => {

        let cidadesDoEstado = cidades.filter((cidade)=>cidade.Estado ===estado.ID)

        let menorNome = cidadesDoEstado.sort(
                (a,b) => (a.Nome.length > b.Nome.length) ? 1 : ((b.Nome.length > a.Nome.length) ? -1 : 0)
            ).slice(0,1)

            menoresNomes.push({"sigla":estado.Sigla, "nome": menorNome[0].Nome})

    });

    console.log (menoresNomes);
}


/*
Criar um método que imprima no console a cidade de maior nome entre todos os estados, seguido do seu UF.
Em caso de empate, considerar a ordem alfabética para ordená-los e então retornar o primeiro. 
Exemplo: “Nome da Cidade - UF".
*/
function maiorNome(){
    
    let estados = obterEstados();
    let cidades = obterCidades();

    let maioresNomes = [{nome:"0",sigla:""}]

    maioresNomes.pop();

    let maiorNome = cidades.sort(
            (a,b) => (a.Nome.length < b.Nome.length) ? 1 : ((b.Nome.length < a.Nome.length) ? -1 : 0)
        ).slice(0,10)
    
    let estadoDaMaiorCidade = estados.filter(estado=>estado.ID === maiorNome[0].Estado);

    console.log (`${maiorNome[0].Nome} - ${estadoDaMaiorCidade[0].Sigla}`);
}


function MenorNome(){
    
    let estados = obterEstados();
    let cidades = obterCidades();

    let menoresNomes = [{sigla:"",nome:"0"}]

    menoresNomes.pop();

    let menorNome = cidades.sort(
            (a,b) => (a.Nome.length > b.Nome.length) ? 1 : ((b.Nome.length > a.Nome.length) ? -1 : 0)
        ).slice(0,10)
        
    let estadoDaMaiorCidade = estados.filter(estado=>estado.ID === menorNome[0].Estado);

    console.log (`${menorNome[0].Nome} - ${estadoDaMaiorCidade[0].Sigla}`);
}



console.log(`\n\n3 -  Estados com Mais cidades*********************\n`);
possuemMaisCidades();

console.log(`\n\n4 -  Estados com menos cidades*********************\\n`);
possuemMenosCidades();

console.log(`\n\n5 -  Cidades com maior nome por estado:*********************\\n`)
CidadeMaiorNome();

console.log(`\n\n6 -  Cidades com menor nome por estado:*********************\\n`)
CidadeMenorNome();

console.log(`\n\n7 -  Cidades com maior nome: *********************\\n`)
maiorNome()

console.log(`\n\n8 -  Cidades com Menor nome: *********************\\n`)
MenorNome()

///