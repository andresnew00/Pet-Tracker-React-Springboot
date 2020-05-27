package com.company.Pettracker.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PetInfo {

    // id provided by the database (MySQL)
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer petId;
    // this constrain uses the @NotNull constrain but also the NotBlankValidator
    // to check if the string is valid and not empty spaces
    @NotBlank
    //this pattern allows only letters so that no special characters or numbers
    // can be stored
    @Pattern(regexp = "^([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+$", message = "Client name should only include letters")
    @Size(min = 2, max = 30, message = "Name should be more than 2 characters and less than 30")
    private String clientName;
    @NotBlank
    @Pattern(regexp = "^([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+$", message = "Pet name should only include letters")
    @Size(max = 15, message = "Pet's name can not be longer than 15 characters")
    private String petName;
    @NotBlank
    // this pattern should only allow for strings in this format "000 0000000"
    @Pattern(regexp = "^((\\d{3})\\s)?(\\d{7})$", message = "format should be area code, space then 7 digits ex. 000 0000000")
    private String phoneNumber;
    @PastOrPresent
    private LocalDate lastTime;
    private boolean isBanned;
    @Pattern(regexp = "^[a-zA-Z]+$", message = "this field should only contain letters")
    private String behavior;

    //empty constructor
    public PetInfo() {
    }

    //constructor with id
    public PetInfo(Integer petId, String clientName, String petName, String phoneNumber, LocalDate lastTime,boolean isBanned,String behavior) {
        this.petId = petId;
        this.clientName = clientName;
        this.petName = petName;
        this.phoneNumber = phoneNumber;
        this.lastTime = lastTime;
        this.isBanned = isBanned;
        this.behavior = behavior;
    }

    //constructor without id
    public PetInfo( String clientName, String petName, String phoneNumber, LocalDate lastTime,boolean isBanned,String behavior) {
        this.clientName = clientName;
        this.petName = petName;
        this.phoneNumber = phoneNumber;
        this.lastTime = lastTime;
        this.isBanned = isBanned;
        this.behavior = behavior;
    }

    // Getters and setters

    public Integer getPetId() {
        return petId;
    }

    public void setPetId(Integer petId) {
        this.petId = petId;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getPetName() {
        return petName;
    }

    public void setPetName(String petName) {
        this.petName = petName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalDate getLastTime() {
        return lastTime;
    }

    public void setLastTime(LocalDate lastTime) {
        this.lastTime = lastTime;
    }

    public boolean isBanned() {
        return isBanned;
    }

    public void setBanned(boolean banned) {
        isBanned = banned;
    }

    public String getBehavior() {
        return behavior;
    }

    public void setBehavior(String behavior) {
        this.behavior = behavior;
    }


    //HashCode and Equals

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PetInfo petInfo = (PetInfo) o;
        return isBanned == petInfo.isBanned &&
                Objects.equals(petId, petInfo.petId) &&
                Objects.equals(clientName, petInfo.clientName) &&
                Objects.equals(petName, petInfo.petName) &&
                Objects.equals(phoneNumber, petInfo.phoneNumber) &&
                Objects.equals(lastTime, petInfo.lastTime) &&
                Objects.equals(behavior, petInfo.behavior);
    }

    @Override
    public int hashCode() {
        return Objects.hash(petId, clientName, petName, phoneNumber, lastTime, isBanned, behavior);
    }
}
