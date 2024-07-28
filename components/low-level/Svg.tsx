import React from "react";
import { SvgXml } from "react-native-svg";

const MySvgComponent = ({ svgMarkup }: { svgMarkup: string }) => <SvgXml xml={svgMarkup} />;

export default MySvgComponent;
