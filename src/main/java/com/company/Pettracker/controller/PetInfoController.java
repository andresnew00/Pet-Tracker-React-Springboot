package com.company.Pettracker.controller;

import com.company.Pettracker.Service.PetInfoService;
import com.company.Pettracker.model.PetInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pet")
public class PetInfoController {

    @Autowired
    PetInfoService service;

    /**
     * create a new pet in the system
     * @param info
     * @return
     */
    @PostMapping("/newPet")
    @ResponseStatus(value = HttpStatus.CREATED)
    public PetInfo createPet(@RequestBody PetInfo info){
        return service.createPet(info);
    }

    /**
     * get all pets
     * @return all pets
     */
    @GetMapping("/getAll")
    @ResponseStatus(value = HttpStatus.OK)
    public List<PetInfo> getAllPets(){
        return service.getAllPets();
    }

    /**
     * get pets by id
     * @param id
     * @return
     */
    @GetMapping("/getById/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public PetInfo getPetsById(@PathVariable Integer id){
        return service.getPetById(id);
    }

    /**
     * get pets by name
     * @param petName
     * @return
     */
    @GetMapping("/getByPetName/{petName}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<PetInfo> getAllPetsByName(@PathVariable String petName){
        return service.getPetByName(petName);
    }

    /**
     * get pets by client name
     * @param clientName
     * @return
     */
    @GetMapping("/getByClientName/{clientName}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<PetInfo> getAllPetsByClientName(@PathVariable String clientName){
        return service.getPetByClientName(clientName);
    }

    /**
     * get pets by phone number
     * @param phoneNumber
     * @return
     */
    @GetMapping("/getByPhoneNumber/{phoneNumber}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<PetInfo> getPetByPhoneNumber(@PathVariable String phoneNumber){
        return service.getPetByPhoneNumber(phoneNumber);
    }

    /**
     * update pet
     * @param info
     */
    @PutMapping("/updatePet/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public PetInfo updatePet(@RequestBody PetInfo info, @PathVariable Integer id){
        return service.updatePet(info, id);
    }

    /**
     * delete pet
     * @param id
     */
    @DeleteMapping("/deletePet/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deletePet(@PathVariable Integer id){
        service.deletePet(id);
    }

    @PutMapping("/checkin/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public void updateCheckInDate(@PathVariable Integer id) {
        service.updateLasttimeIn(id);
    }

}
