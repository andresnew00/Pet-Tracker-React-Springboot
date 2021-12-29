package com.company.Pettracker.dao;

import com.company.Pettracker.model.PetInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//@Repository
public interface PetInfoRepository extends JpaRepository<PetInfo, Integer> {
    /**
     * finds pets by their name (including the ones that share the same name)
     * @param petName
     * @return
     */
    List<PetInfo> findByPetName(String petName);

    /**
     * finds pets by their clients names
     * @param clientName
     * @return
     */
    List<PetInfo> findByClientName(String clientName);

    /**
     * finds pets/clients by the phone number provided
     * @param phoneNumber
     * @return
     */
    List<PetInfo> findByPhoneNumber(String phoneNumber);
}
