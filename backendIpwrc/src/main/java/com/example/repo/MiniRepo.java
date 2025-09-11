package com.example.repo;

import com.example.entity.Mini;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MiniRepo extends JpaRepository<Mini, Long> {
}
