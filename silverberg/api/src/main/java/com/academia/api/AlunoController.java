package com.academia.api;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@RestController
@RequestMapping("/alunos")
@CrossOrigin("http://localhost:5173")
public class AlunoController {
    private JdbcTemplate template;

    public AlunoController(JdbcTemplate template) {
        this.template = template;
    }

    public Boolean existeId(Integer id) {
        String sql = "SELECT * FROM aluno WHERE id = ?";
        Integer qtd = template.queryForObject(sql, Integer.class, id);

        return qtd != null && qtd > 0;
    }

    @PostMapping
    public ResponseEntity<Aluno> cadastrar(@RequestBody Aluno aluno) {
        if (
                aluno.getNome().isBlank() || aluno.getNome() == null ||
                aluno.getEmail().isBlank() || aluno.getEmail() == null ||
                aluno.getTelefone().isBlank() || aluno.getTelefone() == null ||
                aluno.getPlano().isBlank() || aluno.getPlano() == null ||
                aluno.getDataNascimento() == null
        ) {
            return ResponseEntity.status(400).build();
        } else {
            String sqlBusca = "SELECT COUNT(*) FROM aluno WHERE LOWER(nome) = ? AND LOWER(email) = ?";
            Integer qtd = template.queryForObject(sqlBusca, Integer.class, aluno.getNome().toLowerCase(), aluno.getEmail().toLowerCase());

            if (qtd == null || qtd > 0) {
                return ResponseEntity.status(409).build();
            } else {
                String sqlPost = "INSERT INTO aluno (nome, email, telefone, data_nascimento, plano, situacao_cadastro) VALUES (?, ?, ?, ?, ?, ?)";
                KeyHolder holder = new GeneratedKeyHolder();

                template.update(con -> {
                    PreparedStatement statement = con.prepareStatement(
                            sqlPost,
                            Statement.RETURN_GENERATED_KEYS
                    );

                    statement.setString(1, aluno.getNome());
                    statement.setString(2, aluno.getEmail());
                    statement.setString(3, aluno.getTelefone());
                    statement.setDate(4, Date.valueOf(aluno.getDataNascimento()));
                    statement.setString(5, aluno.getPlano());
                    statement.setBoolean(6, true);

                    return statement;
                }, holder);

                Integer i = holder.getKey().intValue();
                aluno.setId(i);

                return ResponseEntity.status(201).body(aluno);
            }
        }
    }

    @GetMapping
    public ResponseEntity<List<Aluno>> exibirAlunos() {
        String sql = "SELECT * FROM aluno";
        List<Aluno> resultado = template.query(sql, new BeanPropertyRowMapper<>(Aluno.class));

        if (resultado.isEmpty()) {
            return ResponseEntity.status(204).build();
        } else {
            return ResponseEntity.status(200).body(resultado);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAluno(@PathVariable Integer id) {
        String sql = "DELETE FROM aluno WHERE id = ?";

        Integer linhas = template.update(sql,id);

        if (linhas == 0) {
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.status(204).build();
    }
}
