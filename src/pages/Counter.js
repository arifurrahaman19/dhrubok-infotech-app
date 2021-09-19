import { useSelector, useDispatch } from "react-redux";

import { increment, decrement } from "../redux/slices/counterSlice";
import Button from "../components/Button";

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);

  return (
    <div className="counter-page">
      <p>
        Counter Value is: <span>{count}</span>
      </p>

      <div className="flex">
        <Button onClick={() => dispatch(decrement())} btnText="- Decrement -" />
        <Button onClick={() => dispatch(increment())} btnText="+ Increment +" />
      </div>
    </div>
  );
};

export default Counter;