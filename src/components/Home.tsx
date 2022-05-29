import React from "react";
import {ReactComponent as Logo} from "../svg/vertical.svg";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-10 md:px-14 xl:px-20  items-center bg-gradient-to-b from-gray-100 to-gray-200 flex-auto">
      <Logo className="fill-blue-700 w-2/3 justify-self-center self-end md:self-center mb-4 md:mb-0"/>
      <p className="text-gray-900 font-medium text-center md:text-left text-2xl self-start md:self-center sm:text-3xl lg:text-4xl mt-4 md:mt-0">
        <strong>Kanan</strong> es una herramienta para la comunidad estudiantil, con la finalidad de <strong>alertar
        </strong> y <strong>disminuir</strong> los casos de COVID en la Escuela Superior de Cómputo
      </p>
    </div>
  );
}
