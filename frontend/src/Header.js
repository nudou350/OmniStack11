import React, { Children } from 'react';

//children mostra todo o conteudo dentro daquele elemento
export default function Header({children}){
    return(
        <header>
            <h1>{children}</h1>
        </header>
    );
}