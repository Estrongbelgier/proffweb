import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";

import "./styles.css";
import TeacherItem, { Teacher } from "../../components/TeachItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  async function searchTeacher(e: FormEvent) {
    e.preventDefault();

    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Those are the teachers available">
        <form id="search-teacher" onSubmit={searchTeacher}>
          <Select
            name="subject"
            label="Subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Math", label: "Math" },
              { value: "Biology", label: "Biology" },
              { value: "Geograph", label: "Geograph" },
              { value: "History", label: "History" },
              { value: "Math 2", label: "Math 2" },
              { value: "Sports", label: "Sports" },
              { value: "Fights", label: "Fights" },
            ]}
          />
          <Select
            name="subject"
            label="Week day"
            value={week_day}
            onChange={(e) => {
              setWeekDay(e.target.value);
            }}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda" },
              { value: "2", label: "Terça" },
              { value: "3", label: "Quarta" },
              { value: "4", label: "Quinta" },
              { value: "5", label: "Sexta" },
              { value: "6", label: "Sabado" },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(event) => {
              setTime(event.target.value);
            }}
          />
          <button type="submit">Search</button>
        </form>
      </PageHeader>
      <main>
        {teachers.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
};

export default TeacherList;

/* TIP dentro da requisição API para colocar headers de parametros
utilizamos params: {objeto}
 */
