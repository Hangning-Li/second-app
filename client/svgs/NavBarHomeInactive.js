import * as React from "react";
import Svg, { Path } from "react-native-svg"

const SvgNavBarHomeInactive = (props) => (
  <Svg
    width={19}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m1.667 7.826 1.09-.863m14.91.863-1.091-.863m0 0L9.666 1.5 2.757 6.963m13.819 0V17.5H12.03M2.757 6.963V17.5h4.728m0 0v-3.364c0-1.225.992-2.217 2.217-2.217v0c1.197 0 2.177.949 2.216 2.145l.112 3.436m-4.545 0h4.545"
      stroke="#468980"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);
export default SvgNavBarHomeInactive;
