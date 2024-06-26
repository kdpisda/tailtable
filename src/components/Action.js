import React from 'react';
import PropTypes from 'prop-types';

/**
 * Action component for displaying an action button.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.action - The action to display.
 * @param {number} props.index - The index of the action.
 * @return {Object} The Action component.
 */
export default function Action({action, index}) {
  return (
    <button
      key={index}
      type="button"
      className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500
      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
      focus-visible:outline-indigo-600"
    >
      <action.icon className="h-5 w-5" aria-hidden="true"/>
    </button>
  );
}

Action.propTypes = {
  action: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
