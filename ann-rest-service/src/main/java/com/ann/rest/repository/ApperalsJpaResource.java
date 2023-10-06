package com.ann.rest.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.ann.rest.dto.Apperals;

@Service
public class ApperalsJpaResource {

	@Autowired
	private ApperalsJpaRepository apperalJpaRepository;

	public List<Apperals> getAllApperals(){
		return apperalJpaRepository.findAll();
	}
	
	public Apperals addApperal(Apperals toAdd){
		Apperals apperal = apperalJpaRepository.save(toAdd);
		return apperal;
	}
	
	public List<Apperals> getApperalsBySearchText(String text){
		List<Apperals> resultApperals = new ArrayList<>();
		List<Apperals> allApperals = apperalJpaRepository.findAll();
		for (Apperals apperal : allApperals) {
			if (apperal.getProductName().toLowerCase().contains(text.trim().toLowerCase())) {
				resultApperals.add(apperal);
			}
		}
		
		return resultApperals;
	}
}
