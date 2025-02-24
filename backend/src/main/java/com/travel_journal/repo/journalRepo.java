package com.travel_journal.repo;

import com.travel_journal.model.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface journalRepo extends JpaRepository<Journal,Integer> {

    Journal getJournalById(int id);
}
