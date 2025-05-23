import { useDraggable } from '@dnd-kit/core';
import { useState } from 'react';
import { roleIcons } from './roleicons';


export default function DraggablePlayer({ player, onRolechange }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: player.id,
  });

  const [showMenu, setShowMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

  const scalefactor = 1.2;

  const style = {
    transform: transform
      ? `translate3d(${transform.x/scalefactor}px, ${transform.y/scalefactor}px, 0)`
      : undefined,
    position: 'absolute',
    left: `${player.x}px`,
    top: `${player.y}px`,
    zIndex: 10,
  };


  const handleRightClick = (e) => {
    e.preventDefault();

    // Place the menu slightly to the right and below the player
    setShowMenu(true);
    setMenuPos({ x: player.x + 10, y: player.y + 10 }); // Adjust values as needed
    
  };

  const handleSelectRole = (role) => {
    onRolechange(player.id, role);
    setShowMenu(false);
  };

  return (
    <div style={style} ref={setNodeRef}>
      <div
        {...listeners}
        {...attributes}
        className="w-12 h-12 bg-yellow-400 text-black font-bold text-[10px] rounded-full flex flex-col items-center justify-center shadow-md cursor-move text-sm"
        onContextMenu={handleRightClick} // Right-click to show menu
      >
        {player.name}
        <div className="text-red-500  text-sm text-center mt-1 italic flex justify-center">
        {(() => {
          const Icon = roleIcons[player.role];
          return Icon ? <Icon className="text-lg" /> : null;
        })()}
      </div>
      </div>
      

      {showMenu && (
        <div
          className=" bg-white text-black border rounded shadow-md p-2 z-50"
          style={{ left: `${menuPos.x}px`, top: `${menuPos.y}px` }}
        >
          {player.availableRoles?.map((role, idx) => {
            const Icon = roleIcons[role];
            return (
              <div
                key={idx}
                className="hover:bg-gray-200 px-2 py-1 cursor-pointer flex items-center gap-2"
                onClick={() => handleSelectRole(role)}
              >
                {Icon && <Icon className="text-lg" />}
                <span className="text-sm">{role}</span>
              </div>
            );
          })}
        </div>
      )}


    </div>
  );
}
