import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import skills from "../../../../json/skill-names.json";

const SkillSelect = ({ selectedSkills, setSelectedSkills }) => {
  const [filtered, setFiltered] = useState([]);
  const [skill, setSkill] = useState("");

  useEffect(() => {
    const filterSkills = () => {
      if (skill === "") {
        setFiltered([]);
        return;
      }
      const filtered = skills.filter(
        (skills) => skills.name.toLowerCase().indexOf(skill.toLowerCase()) === 0
      );
      setFiltered(filtered);
    };
    filterSkills();
  }, [skill]);

  const addSkill = (skill) => {
    if (selectedSkills.includes(skill.name)) {
      toast.error("You cannot select the skill you already chose xD");
      return;
    }
    setSelectedSkills([...selectedSkills, skill.name]);
    setFiltered([]);
    setSkill("");
  };
  const delSkill = (skill) => {
    const newSkillsets = selectedSkills.filter((skills) => skills !== skill);
    setSelectedSkills(newSkillsets);
  };

  // useOutsideAlerter(wrapperRef);

  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor="skills" className="lead">
          Skills
        </label>
        <div className="text-light mb-2">
          {selectedSkills.map((skill, index) => (
            <span
              className="badge badge-dark px-3 py-2 mr-2 mb-1 rounded-sm border border-dark shadow-sm"
              key={index}
              style={{ fontSize: "0.9rem" }}
            >
              {skill}
              <FaTimes
                onClick={() => delSkill(skill)}
                className="pointer-cursor ms-2"
              />
            </span>
          ))}
        </div>
        <div className="input-group">
          <input
            className="form-control"
            placeholder="Start typing out the skills and click to pick them"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
        </div>

        <ul className="list-group background shadow-lg">
          {filtered.length !== 0 &&
            filtered.map((skill, index) => (
              <li
                key={index}
                className="list-group-item background pointer-cursor"
                onClick={() => addSkill(skill)}
              >
                {skill.name}
              </li>
            ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SkillSelect;
