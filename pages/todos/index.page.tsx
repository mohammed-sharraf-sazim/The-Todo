import TodoPageContainer from "@/modules/todo/containers/TodoPageContainer";
import TodoLayout from "../../shared/layouts/TodoLayout/TodoLayout";
import React from "react";

const TodoPage: React.FC = () => {
  return (
    <TodoLayout>
      <TodoPageContainer />
    </TodoLayout>
  );
};

export default TodoPage;
