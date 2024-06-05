import React from 'react';
import PropTypes from 'prop-types';
import Action from '@/components/Action';

/**
 * FreeAction component for displaying actions.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.actions - The actions to display.
 * @return {Object} The FreeAction component.
 */
export default function FreeAction({actions}) {
  return (
    <>
      {actions.map((action, index) => (
        <Action key={index} action={action} index={index} />
      ))}
    </>
  );
}

FreeAction.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
