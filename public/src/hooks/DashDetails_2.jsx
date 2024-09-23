import React from "react";
import { useDispatch } from "react-redux";
import { handelChangeNok, handlePhoneInputNok } from "../features/nok/nokSlice";
import {
  DateRegister,
  GenderInput,
  MultiLineInput,
  PhoneInputs,
  UserInput,
} from "../components";
import { useSelector } from "react-redux";
import {
  handleChangeHarv,
  handleDateHarv,
} from "../features/harvest/honey_harvestSlice";
import { convertToDateOnly } from "../../utils";
import {
  handleChangeHunter,
  handleDateHunter,
  handleEmerInput,
  handlePhoneInput,
} from "../features/hunters/huntersSlice";
import { handleChangeHive, handleDateHive } from "../features/hives/hiveSlice";
import {
  handleChangeReport,
  handleDateReport,
} from "../features/catch_reports/reportSlice";
export const useNok = () => {
  const {
    emp_id,
    fullname,
    email,
    address,
    phone,
    gender,
    relationship,
    sort,
  } = useSelector((store) => store.noks);
  const dispatch = useDispatch();
  const [validationError, setValidationError] = React.useState(false);
  const validateEmail = (email) => {
    // Regular expression for validating an email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const getInput = (e) => {
    const { name, value } = e.target;
    const numericFields = ["emp_id"];
    let processedValue = numericFields.includes(name) ? Number(value) : value;
    if (numericFields.includes(name) && processedValue < 1) {
      processedValue = 1;
    }
    if (name === "email") {
      const isValidEmail = validateEmail(value);
      setValidationError(!isValidEmail);
    }
    dispatch(handelChangeNok({ name, value: processedValue }));
  };

  const getPhoneNumber = (phone) => {
    dispatch(handlePhoneInputNok(phone));
  };
  const nokDetails = [
    {
      name: "emp_id",
      TextField: (
        <UserInput
          name={"emp_id"}
          value={emp_id}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "fullname",
      TextField: (
        <UserInput
          name={"fullname"}
          value={fullname}
          type={"name"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "email",
      TextField: (
        <UserInput
          name={"email"}
          value={email}
          type={"email"}
          handleChange={getInput}
          validationError={validationError}
          message={"Please provide a valid email address"}
        />
      ),
    },
    {
      name: "address",
      TextField: (
        <MultiLineInput
          name={"address"}
          value={address}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "gender",
      TextField: (
        <GenderInput
          name={"gender"}
          value={gender}
          type={"text"}
          gender={["---", "male", "female"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "relationship",
      TextField: (
        <GenderInput
          name={"relationship"}
          value={relationship}
          type={"text"}
          gender={["---", "spouse", "parent", "guardian", "sibling"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "phone",
      TextField: (
        <PhoneInputs
          name={"phone"}
          value={phone}
          type={"tel"}
          handleChange={getPhoneNumber}
        />
      ),
    },
    {
      name: "sort",
      TextField: (
        <GenderInput
          name={"sort"}
          value={sort}
          type={"text"}
          gender={["---", "A-Z", "Z-A", "male", "female"]}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { nokDetails };
};

export const useHarvest = () => {
  const {
    harvest_year,
    station_id,
    station_name,
    harvest_date,
    quantity_collected,
    colouration,
    unit,
    quality_rating,
    note,
    sort,
  } = useSelector((store) => store.harvests);
  const dispatch = useDispatch();
  const getInput = (e) => {
    const { name, value } = e.target;
    const numericFields = [
      "station_id",
      "quantity_collected",
      "quality_rating",
      "harvest_year",
    ];
    let processedValue = numericFields.includes(name) ? Number(value) : value;
    if (numericFields.includes(name) && processedValue < 1) {
      processedValue = 1;
    }
    if (name === "quality_rating") {
      if (processedValue < 1) {
        processedValue = 1;
      } else if (processedValue > 5) {
        processedValue = 5;
      }
    }
    dispatch(handleChangeHarv({ name, value: processedValue }));
  };

  const getDob = (e) => {
    const { name, value } = e.target;
    const formattedDate = convertToDateOnly(value.toISOString());
    dispatch(handleDateHarv({ name, date: formattedDate }));
  };
  const harvestInputs = [
    {
      name: "harvest_year",
      TextField: (
        <UserInput
          name={"harvest_year"}
          value={harvest_year}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "station_id",
      TextField: (
        <UserInput
          name={"station_id"}
          value={station_id}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "station_name",
      TextField: (
        <UserInput
          name={"station_name"}
          value={station_name}
          type={"name"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "harvest_date",
      TextField: (
        <DateRegister
          name={"harvest_date"}
          value={harvest_date}
          onChange={getDob}
        />
      ),
    },
    {
      name: "quantity_collected",
      TextField: (
        <UserInput
          name={"quantity_collected"}
          value={quantity_collected}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "colouration",
      TextField: (
        <UserInput
          name={"colouration"}
          value={colouration}
          type={"colouration"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "unit",
      TextField: (
        <GenderInput
          name={"unit"}
          value={unit}
          type={"text"}
          gender={["---", "litres", "kg"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "quality_rating",
      TextField: (
        <UserInput
          name={"quality_rating"}
          value={quality_rating}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "sort",
      TextField: (
        <GenderInput
          name={"sort"}
          value={sort}
          type={"text"}
          gender={[
            "---",
            "high_volume",
            "low_volume",
            "high-rating",
            "low-rating",
            "latest-harvest",
            "oldest-harvest",
          ]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "note",
      TextField: (
        <MultiLineInput
          name={"note"}
          value={note}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { harvestInputs };
};

export const useHunters = () => {
  const {
    assigned_supervisor,
    fullname,
    phone,
    email,
    joining_date,
    tip,
    employment_status,
    emergency_contact_name,
    emergency_contact,
    notes,
    sort,
  } = useSelector((store) => store.hunters);
  const dispatch = useDispatch();
  const [validationError, setValidationError] = React.useState(false);
  const validateEmail = (email) => {
    // Regular expression for validating an email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const getInput = (e) => {
    const { name, value } = e.target;
    const numericFields = ["assigned_supervisor", "tip"];
    if (name === "email") {
      const isValidEmail = validateEmail(value);
      setValidationError(!isValidEmail);
    }
    let processedValue = numericFields.includes(name) ? Number(value) : value;
    if (numericFields.includes(name) && processedValue < 0) {
      processedValue = 0;
    }
    dispatch(handleChangeHunter({ name, value: processedValue }));
  };

  const getDob = (e) => {
    const { name, value } = e.target;
    const formattedDate = convertToDateOnly(value.toISOString());
    dispatch(handleDateHunter({ name, date: formattedDate }));
  };
  const getPhoneNumber = (phone) => {
    dispatch(handlePhoneInput(phone));
  };
  const getEmergencyContact = (emer) => {
    dispatch(handleEmerInput(emer));
  };
  const hunterInputs = [
    {
      name: "fullname",
      TextField: (
        <UserInput
          name={"fullname"}
          value={fullname}
          type={"name"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "assigned_supervisor",
      TextField: (
        <UserInput
          name={"assigned_supervisor"}
          value={assigned_supervisor}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "phone",
      TextField: (
        <PhoneInputs
          name={"phone"}
          value={phone}
          type={"tel"}
          handleChange={getPhoneNumber}
        />
      ),
    },
    {
      name: "email",
      TextField: (
        <UserInput
          name={"email"}
          value={email}
          type={"email"}
          handleChange={getInput}
          validationError={validationError}
          message={"Please provide a valid email address"}
        />
      ),
    },
    {
      name: "joining_date",
      TextField: (
        <DateRegister
          name={"joining_date"}
          value={joining_date}
          onChange={getDob}
        />
      ),
    },
    {
      name: "tip",
      TextField: (
        <UserInput
          name={"tip"}
          value={tip}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "employment_status",
      TextField: (
        <GenderInput
          name={"employment_status"}
          value={employment_status}
          type={"text"}
          gender={["---", "active", "inactive", "terminated"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "sort",
      TextField: (
        <GenderInput
          name={"sort"}
          value={sort}
          type={"text"}
          gender={[
            "---",
            "A-Z",
            "Z-A",
            "high-low",
            "low-high",
            "newest",
            "oldest",
          ]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "emergency_contact_name",
      TextField: (
        <UserInput
          name={"emergency_contact_name"}
          value={emergency_contact_name}
          type={"emergency_contact_name"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "emergency_contact",
      TextField: (
        <PhoneInputs
          name={"emergency_contact"}
          value={emergency_contact}
          type={"tel"}
          handleChange={getEmergencyContact}
        />
      ),
    },
    {
      name: "notes",
      TextField: (
        <MultiLineInput
          name={"notes"}
          value={notes}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { hunterInputs };
};

export const useHives = () => {
  const {
    assigned_hunter,
    hive_type,
    num_of_frames,
    colonized,
    status,
    use_condition,
    first_installation,
    current_location,
    last_inspection_date,
    note,
    sort,
  } = useSelector((store) => store.hives);
  const dispatch = useDispatch();

  const getInput = (e) => {
    const { name, value } = e.target;
    const numericFields = ["assigned_hunter", "num_of_frames"];

    let processedValue = numericFields.includes(name) ? Number(value) : value;
    if (numericFields.includes(name) && processedValue < 0) {
      processedValue = 0;
    }
    dispatch(handleChangeHive({ name, value: processedValue }));
  };

  const getDob = (e) => {
    const { name, value } = e.target;
    const formattedDate = convertToDateOnly(value.toISOString());
    dispatch(handleDateHive({ name, date: formattedDate }));
  };

  const hiveInputs = [
    {
      name: "assigned_hunter",
      TextField: (
        <UserInput
          name={"assigned_hunter"}
          value={assigned_hunter}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "num_of_frames",
      TextField: (
        <UserInput
          name={"num_of_frames"}
          value={num_of_frames}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },

    {
      name: "first_installation",
      TextField: (
        <DateRegister
          name={"first_installation"}
          value={first_installation}
          onChange={getDob}
        />
      ),
    },
    {
      name: "last_inspection_date",
      TextField: (
        <DateRegister
          name={"last_inspection_date"}
          value={last_inspection_date}
          onChange={getDob}
        />
      ),
    },
    {
      name: "hive_type",
      TextField: (
        <GenderInput
          name={"hive_type"}
          value={hive_type}
          type={"text"}
          gender={["---", "langstroth", "top bar", "local"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "colonized",
      TextField: (
        <GenderInput
          name={"colonized"}
          value={colonized}
          type={"text"}
          gender={["---", "pending", "confirmed", "installed"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "status",
      TextField: (
        <GenderInput
          name={"status"}
          value={status}
          type={"text"}
          gender={["---", "unuse", "inuse", "empty"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "use_condition",
      TextField: (
        <GenderInput
          name={"use_condition"}
          value={use_condition}
          type={"text"}
          gender={["---", "need repair", "used", "new"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "current_location",
      TextField: (
        <GenderInput
          name={"current_location"}
          value={current_location}
          type={"text"}
          gender={["---", "swarm field", "station", "warehouse"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "sort",
      TextField: (
        <GenderInput
          name={"sort"}
          value={sort}
          type={"text"}
          gender={["---", "high-low", "low-high", "recent", "old"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "note",
      TextField: (
        <MultiLineInput
          name={"note"}
          value={note}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { hiveInputs };
};

export const useCatchReports = () => {
  const {
    hunter_id,
    assigned_supervisor,
    total_boxes_assigned,
    colonized_boxes,
    uncolonized_boxes,
    delivered_to_apiary,
    date_assigned,
    catch_date,
    catch_location,
    catch_status,
    season,
    sort,
    notes,
  } = useSelector((store) => store.reports);
  const dispatch = useDispatch();

  const getInput = (e) => {
    const { name, value } = e.target;
    const numericFields = [
      "assigned_hunter",
      "assigned_supervisor",
      "total_boxes_assigned",
      "colonized_boxes",
      "uncolonized_boxes",
    ];

    let processedValue = numericFields.includes(name) ? Number(value) : value;
    if (numericFields.includes(name) && processedValue < 0) {
      processedValue = 0;
    }
    dispatch(handleChangeReport({ name, value: processedValue }));
  };

  const getDob = (e) => {
    const { name, value } = e.target;
    const formattedDate = convertToDateOnly(value.toISOString());
    dispatch(handleDateReport({ name, date: formattedDate }));
  };

  const reportInputs = [
    {
      name: "hunter_id",
      TextField: (
        <UserInput
          name={"hunter_id"}
          value={hunter_id}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "assigned_supervisor",
      TextField: (
        <UserInput
          name={"assigned_supervisor"}
          value={assigned_supervisor}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "total_boxes_assigned",
      TextField: (
        <UserInput
          name={"total_boxes_assigned"}
          value={total_boxes_assigned}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "colonized_boxes",
      TextField: (
        <UserInput
          name={"colonized_boxes"}
          value={colonized_boxes}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "uncolonized_boxes",
      TextField: (
        <UserInput
          name={"uncolonized_boxes"}
          value={uncolonized_boxes}
          type={"number"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "date_assigned",
      TextField: (
        <DateRegister
          name={"date_assigned"}
          value={date_assigned}
          onChange={getDob}
        />
      ),
    },
    {
      name: "catch_date",
      TextField: (
        <DateRegister
          name={"catch_date"}
          value={catch_date}
          onChange={getDob}
        />
      ),
    },
    {
      name: "catch_location",
      TextField: (
        <UserInput
          name={"catch_location"}
          value={catch_location}
          handleChange={getInput}
          type={"name"}
        />
      ),
    },
    {
      name: "catch_status",
      TextField: (
        <GenderInput
          name={"catch_status"}
          value={catch_status}
          type={"text"}
          gender={["---", "all pending", "all successfull", "some pending"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "season",
      TextField: (
        <GenderInput
          name={"season"}
          value={season}
          type={"text"}
          gender={["---", "dry", "rain"]}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "delivered_to_apiary",
      TextField: (
        <GenderInput
          name={"delivered_to_apiary"}
          value={delivered_to_apiary}
          type={"text"}
          gender={["---", "all", "some", "none"]}
          handleChange={getInput}
        />
      ),
    },

    {
      name: "notes",
      TextField: (
        <MultiLineInput
          name={"notes"}
          value={notes}
          type={"text"}
          handleChange={getInput}
        />
      ),
    },
    {
      name: "sort",
      TextField: (
        <GenderInput
          name={"sort"}
          value={sort}
          type={"text"}
          gender={["---", "new", "old"]}
          handleChange={getInput}
        />
      ),
    },
  ];
  return { reportInputs };
};
