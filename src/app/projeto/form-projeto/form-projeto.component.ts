import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjetoService } from '../projeto/projeto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Iprojeto } from '../projeto/iprojeto';

@Component({
  selector: 'app-curso-form',
  templateUrl: './form-projeto.component.html',
  styleUrls: ['./form-projeto.component.scss']
})

export class FormprojetoComponent implements  OnInit{
  form = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(''),
    descricao: new FormControl (''),
    qtdeParticipantes: new FormControl(''),
    responsavel: new FormControl (''),
    custo: new FormControl(''),

  
});

constructor(
private service: ProjetoService,
private route:ActivatedRoute,
private router: Router
){ }

ngOnInit(){ this.ListarPorId(); }

Salvar() {
  if(this.form.value.id){
    this.service.atualizar(this.form.value).subscribe(
      success => {
        alert("Empresa atualizada com sucesso!");
        this.router.navigate(['']);
      },
      Error => alert("Erro ao atualizar empresa ")
    );
  }

  else{ 
    this.service.criar(this.form.value).subscribe(
      success => {
        alert("Projeto cadastrado com sucesso!");
        this.router.navigate(['']);
      },
      Error => alert("Erro ao cadastrar projeto ")
    );
  }

  this.form.reset();

}
ListarPorId(){
this.route.params
  .pipe(
    map((params: any) => params['id']),
    switchMap(id => this.service.listarPorId(id))

  ).subscribe(projeto => this.atualizarForm(projeto));
}

atualizarForm(projeto: Iprojeto){
  // o comando abaixo refere-se esse vormulário recebera o 
  // valor do caminho = valor da URL
  this.form.patchValue({
    id: projeto.id,
    nome:projeto.nome,
    descricao:projeto.descricao,
    qtdeParticipantes:projeto.qtdeParticipantes,
    responsavel:projeto.responsavel,
    custo:projeto.custo
  });

}

Cancelar() {
this.form.reset();
console.log('Cancelado');
}

}