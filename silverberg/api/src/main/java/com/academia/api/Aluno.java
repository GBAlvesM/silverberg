package com.academia.api;

import java.time.LocalDate;
import java.util.Date;

public class Aluno {
    private Integer id;
    private String nome;
    private String email;
    private String telefone;
    private LocalDate dataNascimento;
    private String plano;
    private Boolean situacaoCadastro;

    public Aluno() {}

    public Aluno(Integer id, String nome, String email, String telefone, LocalDate dataNascimento, String plano, Boolean situacaoCadastro) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.dataNascimento = dataNascimento;
        this.plano = plano;
        this.situacaoCadastro = situacaoCadastro;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getPlano() {
        return plano;
    }

    public void setPlano(String plano) {
        this.plano = plano;
    }

    public Boolean getSituacaoCadastro() {
        return situacaoCadastro;
    }

    public void setSituacaoCadastro(Boolean situacaoCadastro) {
        this.situacaoCadastro = situacaoCadastro;
    }
}
