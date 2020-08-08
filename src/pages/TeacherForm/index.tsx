import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";
import { useHistory } from "react-router-dom";

import "./styles.css";
import Input from "../../components/Input";

import warningIcon from "../../assets/images/icons/warning.svg";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";

const TeacherForm: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  function setScheduleItemValue(
    position: Number,
    field: string,
    value: string
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });
    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    /* WARNIG chamada api aqui */

    api
      .post("classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        toast.success("Classe created!!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        history.push("/");
      })
      .catch(() => {
        toast.error("Fill up all fields.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: "",
        to: "",
      },
    ]);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="It's wasome that you want to teach!"
        description="Isso aqui é uma descrição de algo"
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Your informations</legend>
            <Input
              name="name"
              label="Your full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></Input>
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            ></Input>
            <Input
              name="whatsapp"
              label="Whatapp"
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            ></Input>
            <Textarea
              name="bio"
              label="Biography"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            ></Textarea>
          </fieldset>

          <fieldset>
            <legend>About your class</legend>
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
                { value: "MathII", label: "Math II" },
                { value: "Sports", label: "Sports" },
                { value: "Fights", label: "Fights" },
              ]}
            />
            <Input
              type="money"
              name="cost"
              label="Cost per hour of class"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            ></Input>
          </fieldset>

          <fieldset>
            <legend>
              Aveilability
              <button type="button" onClick={addNewScheduleItem}>
                + New schedule
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="subject"
                    label="Week day"
                    value={scheduleItem.week_day}
                    onChange={(e) => {
                      setScheduleItemValue(index, "week_day", e.target.value);
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
                    name="from"
                    label="From"
                    type="time"
                    value={scheduleItem.from}
                    onChange={(e) => {
                      setScheduleItemValue(index, "from", e.target.value);
                    }}
                  ></Input>
                  <Input
                    name="to"
                    label="To"
                    value={scheduleItem.to}
                    type="time"
                    onChange={(e) => {
                      setScheduleItemValue(index, "to", e.target.value);
                    }}
                  ></Input>
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Warning!!" />
              Important! <br />
              Please complete all fields
            </p>
            <button type="submit">Save</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;

/* TIP Toast esta funcionando de uma forma diferente agora,
 a mesma esta se comportando como uma componente React, da para fazer
 varias modificações. A principio é so colocar o Container em algum lugar 
 e chamar o CSS e o objeto onde vai usar a toast.
  */
