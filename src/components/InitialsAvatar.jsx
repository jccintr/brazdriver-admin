import React from 'react';

const InitialsAvatar = ({ 
  name, 
  size = 60, 
  className = '' 
}) => {
  
  const getInitials = (fullName) => {
    if (!fullName || typeof fullName !== 'string') return '?';

    const words = fullName.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return '?';

    // Partículas que devem ser ignoradas (comuns em nomes portugueses/brasileiros)
    const particles = new Set([
      'de', 'da', 'do', 'dos', 'das', 
      'e', 'o', 'a', 'em', 'para'
    ]);

    // Filtra as partículas
    const significantWords = words.filter(word => 
      !particles.has(word.toLowerCase())
    );

    if (significantWords.length === 0) {
      return words[0][0].toUpperCase(); // fallback
    }

    if (significantWords.length === 1) {
      return significantWords[0][0].toUpperCase();
    }

    // Pega a primeira letra do primeiro nome + primeira letra do último sobrenome significativo
    const firstInitial = significantWords[0][0].toUpperCase();
    const lastInitial = significantWords[significantWords.length - 1][0].toUpperCase();

    return firstInitial + lastInitial;
  };

  const getColor = (str) => {
    if (!str) return '#64748b';
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 75%, 55%)`;
  };

  const initials = getInitials(name);
  const backgroundColor = getColor(name);

  return (
    <div
      className={`
        flex items-center justify-center 
        rounded-full text-white font-semibold 
        select-none shadow-lg
        ${className}
      `}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${Math.floor(size / 2.5)}px`,
        backgroundColor,
        letterSpacing: '1px',
      }}
      title={name}
    >
      {initials}
    </div>
  );
};

export default InitialsAvatar;