package com.mikirill.jwt.api.repository;

import com.mikirill.jwt.api.entity.Dot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author Kir
 * Created on 02.12.2020
 */
public interface DotRepository extends JpaRepository<Dot, Integer> {
    void deleteDotsByUsername(String username);
    List<Dot> getAllByUsername(String username);
}
