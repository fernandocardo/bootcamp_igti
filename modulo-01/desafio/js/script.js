
window.addEventListener('load',()=>{
    
    document.querySelector('#botao').addEventListener('click', carregarPessoas);
    document.querySelector('#buscarInput').addEventListener('keypress', e => {
        if(e.keyCode === 13){
            
            carregarPessoas();
        }
    });
})
const URL = 'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo';


function obterPessoas (url){
    return fetch(url)
}

async function carregarPessoas(){
    try {

        const input = document.querySelector('#buscarInput');
        const botao =  document.querySelector('#botao');

        const pessoasResponse = await obterPessoas(URL);
        const pessoas = await pessoasResponse.json();
        //console.log(pessoas.results)

        let filtro = input.value.toLowerCase();

        const pessoasFiltradas = filtrarPessoas(pessoas,filtro);
        
        
        //console.log(pessoasFiltradas)
        listarPessoasFiltradas(pessoasFiltradas);
        listarEstatisticas(pessoasFiltradas);



    } catch (error) {
        console.log('erro')
    }
}


function filtrarPessoas(pessoas,filtro){
 
        return pessoas.results.filter(
        pessoa => pessoa.name.first.toLowerCase().includes(buscarInput.value.toLowerCase())|| 
        pessoa.name.last.toLowerCase().includes(filtro)
    )
}

function listarPessoasFiltradas(pessoas){
    
    const quantidadePessoas = pessoas.length

    if(quantidadePessoas > 0){
        const encontrados = document.querySelector('#encontrados');
        encontrados.innerHTML = `<h3>${quantidadePessoas} usuarios(s) encontrados</h3>`

        const lista = document.querySelector('#lista');

        let pessoasFiltradas = ""
    
        for (var i=0; i < pessoas.length; i++){
            pessoasFiltradas+=(`<img src="${pessoas[i].picture.thumbnail}"> ${pessoas[i].name.first} ${pessoas[i].name.last}, ${pessoas[i].dob.age} anos <BR>`)
        }
    
        lista.innerHTML = pessoasFiltradas;

    }else{
        encontrados.innerHTML = '<h3>Nenhum usuário filtrado</h3>';
        lista.innerHTML = "";
    }
}

function listarEstatisticas(pessoas){
   
    const estatisticas = document.querySelector('#estatisticas');

    const valorEstatisticas = document.querySelector('#valorEstatisticas');
    const quantidadePessoas = pessoas.length

    if(quantidadePessoas > 0)
    {
        let estatisticasFiltradas =""
        estatisticasFiltradas += `Sexo Masculino: ${pessoas.filter(pessoa => pessoa.gender === 'male').length} <BR>`
        estatisticasFiltradas += `Sexo Feminino: ${pessoas.filter(pessoa => pessoa.gender === 'female').length} <BR>`
        estatisticasFiltradas += `Soma das Idades: ${pessoas.reduce((accum,obj)=> accum + obj.dob.age,0)} <BR>`
        estatisticasFiltradas += `Media das Idades: ${pessoas.reduce((accum,obj)=> accum + obj.dob.age,0)/pessoas.length} <BR>`

        valorEstatisticas.innerHTML = estatisticasFiltradas;
        estatisticas.innerHTML = '<h3>Estatística</h3>'
    }else{
        valorEstatisticas.innerHTML  = "";

        estatisticas.innerHTML = '<h3>Nada a ser exibido</h3>'

    }

}