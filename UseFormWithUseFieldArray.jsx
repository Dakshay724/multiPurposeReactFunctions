import React, { useEffect, useMemo } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

let renderCount = 0;

export default function App() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      test: [{ firstName: "", lastName: "" }],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: "test",
    });

  const onSubmit = (data) => console.log("data", data);

  console.log("watch", watch());
  console.log("errors===", errors);
  const watchedFirstNames = watch(
    fields.map((_, index) => `test.${index}.firstName`)
  );

  const watchedFirstNamesString = useMemo(
    () => watchedFirstNames.join(),
    [watchedFirstNames]
  );

  useEffect(() => {
    trigger();
  }, [watchedFirstNamesString, trigger]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          {...register("name", { required: true })}
        />
        {errors.name && <span>This field is required</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          {...register("email", { required: true })}
        />{" "}
        */
        {errors.email && <span>This field is required</span>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          {...register("password", { required: true })}
        />
        {errors.password && errors.password.type === "required" && (
          <span>This field is required</span>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <span>Password must be at least 6 characters long</span>
        )}
      </div>

      <h1>Field Array </h1>
      <p>The following demo allow you to delete, append, prepend items</p>
      <span className="counter">Render Count: {renderCount}</span>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <div>
                <input
                  {...register(`test.${index}.firstName`, {
                    required: "First name is required",
                    minLength: {
                      value: 5,
                      message: "First name must be at least 5 characters long",
                    },
                    maxLength: {
                      value: 10,
                      message: "First name cannot exceed 10 characters",
                    },
                  })}
                />
                {errors.test && errors.test[index]?.firstName && (
                  <span>{errors.test[index].firstName.message}</span>
                )}
              </div>

              <Controller
                render={({ field }) => <input {...field} />}
                name={`test.${index}.lastName`}
                control={control}
              />
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <section>
        <button
          type="button"
          onClick={() => {
            append({ firstName: "", lastName: "" });
          }}
        >
          append
        </button>

        <button type="button" onClick={() => remove(1)}>
          remove at
        </button>
      </section>

      <button type="submit">Submit</button>
    </form>
  );
}
