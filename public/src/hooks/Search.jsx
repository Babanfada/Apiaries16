const useSearchUsers = () => {
  const searchUsers = [
    {
      name: "fullname",
      TextField: (
        <UserInput
          name={"fullname"}
        //   value={fullname}
          type={"text"}
          //   handleChange={getInput}
        />
      ),
    },
    {
      name: "email",
      TextField: (
        <UserInput
          name={"email"}
        //   value={email}
          type={"email"}
        //   handleChange={getInput}
        //   validationError={validationError}
          message={"Please provide a valid email address"}
        />
      ),
    },
    {
      name: "fullname",
      TextField: (
        <UserInput
          name={"fullname"}
          value={fullname}
          type={"text"}
          //   handleChange={getInput}
        />
      ),
    },
    {
      name: "fullname",
      TextField: (
        <UserInput
          name={"fullname"}
          value={fullname}
          type={"text"}
          //   handleChange={getInput}
        />
      ),
    },
  ];
  return { searchUsers };
};
