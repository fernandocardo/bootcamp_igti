import fs from 'fs';
import moment from 'moment';
import express from 'express';


const app = express();

app.use(express.json())

app.get('/grades',  (req, res) => { 
    let grades = buscar();
    res.send(grades);
});

app.get('/grades/:id',  (req, res) => { 
    let id = req.params.id
    let grades = buscar(id);
    res.send(grades);
});


app.post('/grades',  (req, res) => { 

    let student = req.body.student
    let subject = req.body.subject
    let type = req.body.type
    let value = req.body.value

    incluir(student,subject,type,value)
   res.status(201)
   res.send('created');
});


app.put('/grades/:id',  (req, res) => { 

    let student = req.body.student
    let subject = req.body.subject
    let type = req.body.type
    let value = req.body.value

    let id = parseInt(req.params.id)
    let grades = buscar(id);

    if (grades.length === 1){
        atualizar(id,student,subject,type,value)
        res.status(204)
        res.send('resource updated successfully');
    }
    else{
        res.status(409);
        res.send('resource not foundaded');
    }
    

});


app.delete('/grades/:id',  (req, res) => { 

    let id = parseInt(req.params.id)
    let grades = buscar(id);

    if (grades.length === 1){
        apagar(id);
        res.status(204);
        res.send('resource deleted successfully');
    }else{
        res.status(409);
        res.send('Not Founded')
    }
    
});

app.get('/notatotal',  (req, res) => { 
    let student = req.body.student
    let subject = req.body.subject
    let grades = notaTotal(student,subject).toString();

    //console.log(grades);
    res.send(grades);
});

app.get('/notamedia',  (req, res) => { 
    let type = req.body.type
    let subject = req.body.subject

    let grades = notaMedia(subject,type).toString();
    res.send(grades);
});

app.get('/tresmaiores',  (req, res) => { 
    let type = req.body.type
    let subject = req.body.subject

    let grades = tresMaiores(subject,type);
    res.send(grades);
});



app.listen(3000,  () => {
  console.log('Example app listening on port 3000!');
});


const URL = 'data/grades2.json';

function arquivoParaJson(endereco){
    let arquivo =  fs.readFileSync(endereco,);
    let arquivoParseado = JSON.parse(arquivo);
    return arquivoParseado;
}

function incluir(student,subject,type, value){

    let grade =     
    {
        "student": student,
        "subject": subject,
        "type": type,
        "value": value,
        "timestamp": moment().format()
    }

    let json = arquivoParaJson(URL);

    grade = {id: json.nextId++, ...grade};
    json.grades.push(grade);

    fs.writeFileSync(URL, JSON.stringify(json),);

}

function buscar(id){
    
    if (id != undefined){

        let retorno = arquivoParaJson(URL).grades.filter(grade => grade.id === parseInt(id));
        return retorno;
    }

    return arquivoParaJson(URL).grades;
}

function apagar(id){

    let json;
    let grades;
    
    json =  arquivoParaJson(URL)

    grades = arquivoParaJson(URL).grades.filter(grade => grade.id != id);   

    json.grades = grades

    fs.writeFileSync(URL, JSON.stringify(json),);

}


function atualizar(id,student,subject,type, value){

    
    apagar(id)
    
    let grade =     
    {
        "id": id,
        "student": student,
        "subject": subject,
        "type": type,
        "value": value,
        "timestamp": moment().format()
    }


    let json = arquivoParaJson(URL);

    grade = { ...grade};
    json.grades.push(grade);

    fs.writeFileSync(URL, JSON.stringify(json),);

}

function  notaTotal(student,subject){
    return buscarPorStdentESubject(student,subject)
    .reduce((soma=0,student)=> {return soma + student.value},0);
}

function  notaMedia(subject,type){
    let filtro = buscarPorSubjectEType(subject,type);
    
    return filtro
    .reduce((soma=0,student)=> {return soma + student.value},0)/filtro.length;
}

function buscarMelhoresGrades(student,type){

}

function buscarPorStdentESubject(student,subject){
    return arquivoParaJson(URL).grades
    .filter(grade => grade.student === student && grade.subject ===subject);
}


function tresMaiores(student,subject){
    
    return buscarPorSubjectEType(student,subject)
    .sort(
        (a,b) => (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0))
    .slice(0,3)
}

function buscarPorSubjectEType(subject,type){
    return arquivoParaJson(URL).grades
    .filter(grade => grade.subject === subject && grade.type ===type);
}


//console.log(notaMedia("03 - React","Desafio"))