
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'student 1', cohort_id: 1},
        {name: 'student 2', cohort_id: 2},
        {name: 'student 3', cohort_id: 3},
        {name: 'student 4', cohort_id: 3},
        {name: 'student 5', cohort_id: 4},
        {name: 'student 6', cohort_id: 1},
        {name: 'student 7', cohort_id: 2},
        {name: 'student 8', cohort_id: 1},
        {name: 'student 9', cohort_id: 4}
      ]);
    });
};
