package com.ann.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ann.rest.dto.ApperalsDetails;

@Repository
public interface ApperalsDetailsJpaRepository extends JpaRepository<ApperalsDetails, Long> {

}
