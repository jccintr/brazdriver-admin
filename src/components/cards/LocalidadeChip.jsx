import React from 'react';

const LocalidadeChip = ({ localidade, onEdit }) => {
    return (
        <div 
            onClick={() => onEdit && onEdit(localidade)}
            className={`inline-block ml-1 px-2 py-1 rounded-full text-xs border transition text-white bg-green-500 hover:bg-green-600 cursor-pointer`}
        >
            {localidade.nome}
        </div>
    );
};

export default LocalidadeChip;