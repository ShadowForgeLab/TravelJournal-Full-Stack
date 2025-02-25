package com.travel_journal;


import com.travel_journal.model.Journal;
import com.travel_journal.service.journalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.interfaces.RSAKey;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class journalController {

    @Autowired
    private journalService service;
    private static final Logger logger = LoggerFactory.getLogger(journalController.class);

    @PostMapping("/journal")
    public ResponseEntity<?> addJournal(@RequestBody Journal journal){
        logger.info("Received Journal Request: {}", journal);
        Journal journal1=null;

        try{
            journal1=service.addJournal(journal);
            logger.info("Journal saved successfully: {}", journal1);
            return new ResponseEntity<>(journal1, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping("/journal")
    public List<Journal> getJournal(){
        return service.getJournal();
    }

    @DeleteMapping("/journal/{id}")
    public void deleteJournal(@PathVariable("id") int id){
        service.deleteJournal(id);
    }

    @GetMapping("/journal/{id}")
    public ResponseEntity<Journal> getJournalById(@PathVariable("id") int id){
        Journal journal=service.getJournalById(id);
        return new ResponseEntity<>(journal,HttpStatus.OK);
    }

    @PutMapping("/journal/{id}")
    public ResponseEntity<?> updateJournal(@PathVariable("id") int id, @RequestBody Journal journalDetails) {
        try {
            System.out.println("Received Update Request for ID: " + id);
            System.out.println("Request Body: " + journalDetails);
            Optional<Journal> optionalJournal = Optional.ofNullable(service.getJournalById(id));

            if (optionalJournal.isPresent()) {
                Journal journal = optionalJournal.get();

                // Updating fields
                journal.setTitle(journalDetails.getTitle());
                journal.setCountry(journalDetails.getCountry());
                journal.setMapLink(journalDetails.getMapLink());
                journal.setFromDate(journalDetails.getFromDate());
                journal.setToDate(journalDetails.getToDate());
                journal.setText(journalDetails.getText());

                service.addJournal(journal);

                return ResponseEntity.ok(journal);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Journal not found with ID: " + id);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating journal: " + e.getMessage());
        }
    }
}
