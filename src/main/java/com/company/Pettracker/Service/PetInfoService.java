package com.company.Pettracker.Service;

import com.company.Pettracker.dao.PetInfoRepository;
import com.company.Pettracker.exception.PetNotFoundException;
import com.company.Pettracker.model.PetInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Component
public class PetInfoService {
    private final PetInfoRepository petInfoRepository;

    @Autowired
    public PetInfoService(PetInfoRepository petInfoRepository) {
        this.petInfoRepository = petInfoRepository;
    }

    public PetInfo createPet(PetInfo info) {
        info.setLastTime(getCurrentDate());
        return petInfoRepository.save(info);
    }

    public List<PetInfo> getAllPets() {
        return petInfoRepository.findAll();
    }

    public PetInfo getPetById(Integer id) {
        return petInfoRepository.findById(id)
                .orElseThrow(() -> new PetNotFoundException("Could not find a pet by the id of " + id));
    }

    public List<PetInfo> getPetByName(String name) {
        if(petInfoRepository.findByPetName(name).isEmpty()) {
            throw new PetNotFoundException("Pet was not found by the name of " + name);
        } else {
            return petInfoRepository.findByPetName(name);
        }
    }

    public List<PetInfo> getPetByClientName(String clientName) {
        if(petInfoRepository.findByPetName(clientName).isEmpty()) {
            throw new PetNotFoundException("No client was found by the name of " + clientName);
        } else {
            return petInfoRepository.findByClientName(clientName);
        }

    }

    public List<PetInfo> getPetByPhoneNumber(String phoneNumber) {
        if(petInfoRepository.findByPhoneNumber(phoneNumber).isEmpty()) {
            throw new PetNotFoundException("No client was found by the phone number of " + phoneNumber);
        } else {
            return petInfoRepository.findByPhoneNumber(phoneNumber);
        }
    }

    public PetInfo updatePet(PetInfo info, Integer id) {
        PetInfo petToModify = petInfoRepository.findById(id).orElseThrow(() -> new PetNotFoundException("Not pet found by the id of " + id));
        petToModify.setPetName(info.getPetName());
        petToModify.setLastTime(info.getLastTime());
        petToModify.setBanned(info.isBanned());
        petToModify.setBehavior(info.getBehavior());
        petToModify.setClientName(info.getClientName());
        petToModify.setPhoneNumber(info.getPhoneNumber());

        return petInfoRepository.save(petToModify);
    }

    public void deletePet(Integer id) {
        PetInfo petToDelete = petInfoRepository.findById(id)
                .orElseThrow(() -> new PetNotFoundException("Could not find a pet by the id of " + id));
        petInfoRepository.delete(petToDelete);
    }

    public void updateLasttimeIn(Integer id) {
        PetInfo petToCheckIn = petInfoRepository.findById(id).orElseThrow(() -> new PetNotFoundException("not pet found to check in"));

        petToCheckIn.setLastTime(getCurrentDate());

        petInfoRepository.save(petToCheckIn);
    }

    public LocalDate getCurrentDate() {
        // time zone will vary depending on where user is for now is hard coded to current time zone
        ZoneId zoneId = ZoneId.of("America/New_York");
        return LocalDate.now(zoneId);
    }

}
