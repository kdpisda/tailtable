import {XCircleIcon} from '@heroicons/react/16/solid';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Error component for displaying error messages.
 *
 * @param {Object} props - Component props.
 * @param {string} props.error - The error message to display.
 * @return {Object} The Error component.
 */
export default function Error({error}) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true"/>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{error}</h3>
        </div>
      </div>
    </div>
  );
}


Error.propTypes = {
  error: PropTypes.string.isRequired,
};
