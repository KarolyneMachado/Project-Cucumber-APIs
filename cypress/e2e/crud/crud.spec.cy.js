import{Given, When, Then,} from '@badeball/cypress-cucumber-preprocessor'
import faker from 'faker'

/// <reference types="cypress" />

//cenario 01
Given(/^que o sistema precise listar todos usuarios$/, () => {
	
});

When(/^enviar requisicao no endpoint$/, () => {
    cy.request({
        url:'usuarios',
        method:'GET',
        
    }).as("getRequestUsers200")
});


Then(/^esperado response code is 200 sucess com lista de usuarios.$/, () => {
	cy.get("@getRequestUsers200").should((response)=>{
        expect(response.status).to.eq(200)
        expect(response.body).property("quantidade").to.be.a("number")
        expect(response.body).property("usuarios").to.be.a("Array")
    })
});

//cenario 02 
Given(/^que o sistema precise busca usuario invalido$/, () => {
	
});

When(/^enviar requisicao com idUserInvalido$/, () => {
    cy.request({
        url:'usuarios/idUserInvalido',
        method:'GET',
        failOnStatusCode: false
    }).as("getRequest404")
});

Then(/^esperado response code is 400$/, () => {
	cy.get("@getRequest404").should((response)=>{
        expect(response.status).to.eq(400);
        expect(response.body).to.include({message: "Usuário não encontrado"})
    })
});

//cenario 03
Given(/^que o sistema queira cadastrar usuario novo$/, () => {
	
});

When(/^enviar requisicao com payloand valido$/, () => {
	cy.request({
        url:"usuarios",
        method:"POST",
        body:{
            "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
           "email": faker.internet.email(),
            "password": "teste",
            "administrador": "true"
          }    
    }).as("PostRequest201")
});


Then(/^esperado response code is 201 e realize criar com sucesso.$/, () => {
    cy.get("@PostRequest201").should((response)=>{
        expect(response.status).to.eq(201)
        expect(response.body).to.include({message:"Cadastro realizado com sucesso"})
        expect(response.body).property("_id").to.be.a("string")
    })
    
});

//cenario 04
Given(/^que o sistema precise lista um usuario$/, () => {
	
});

//id do usuario??
When(/^enviar requisicao com idUser$/, () => {
    cy.request({
        url:"usuarios/",
        method:'GET',
    }).as("getRequestUser200")
});

Then(/^esperado response code is 200 sucess com id informado.$/, () => {
	cy.get("@getRequestUser200").should((response)=>{
        expect(response.status).to.eq(200)
    })
});



//cenario 05

Given(/^que o sistema queira cadastrar usuario invalido$/, () => {
	
});

When(/^enviar requisicao com payloand invalido$/, () => {
	cy.request({
        url:"usuarios",
        method:"POST",
        failOnStatusCode: false   
    }).as("PostRequest400")
});

Then(/^esperado response code is 400 e nao realize cadastro.$/, () => {
	cy.get("@PostRequest400").should((response)=>{
        expect(response.status).to.eq(400);
        expect(response.body).to.include({
            nome: "nome é obrigatório",
            email: "email é obrigatório",
            password: "password é obrigatório",
            administrador: "administrador é obrigatório" 
    })
    })
});

//cenario 06

Given(/^que o sistema precise atualizar usuario$/, () => {
	
});
//id usuario na url 
When(/^enviar requisicao com alteracao de senha$/, () => {
	cy.request({
        url:"usuarios",
        method:"POST",
        body:{
            "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
           "email": faker.internet.email(),
            "password": "teste",
            "administrador": "true"
          }    
    }).then((res)=>{
        const id = res.body._id

        cy.request({
            url:`usuarios/${id}`,
            method:"PUT",
            body:{
                "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
                "email": faker.internet.email(),
                "password": "teste1",
                "administrador": "true"
              }  
        }).as("PutRequest200")
    })
    
    
   
});

Then(/^esperado response code is 200 e realize alteracao.$/, () => {
	cy.get("@PutRequest200").should((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body).to.include({message: "Registro alterado com sucesso"})

    })
});

//cenario 07 

Given(/^que o sistema precise remover usuario$/, () => {
	
});
//iduser 
When(/^enviar requisicao delete com idUser$/, () => {
	

    cy.request({
        url:"usuarios",
        method:"POST",
        body:{
            "nome": `${faker.name.firstName()} ${faker.name.lastName()}`,
           "email": faker.internet.email(),
            "password": "teste",
            "administrador": "true"
          }    
    }).then((res)=>{
        const id = res.body._id

        cy.request({
            url:`usuarios/${id}`,
            method:"DELETE",
        }).as("DeleteRequest200")
    })
});

Then(/^esperado response code is 200 e remova usuario.$/, () => {
    cy.get("@DeleteRequest200").should((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body).to.include({message: "Registro excluído com sucesso"})

    })
});
