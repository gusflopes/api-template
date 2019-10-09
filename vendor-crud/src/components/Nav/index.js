import React from 'react';

import './styles.css';

//Project icons
import ListIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import LogoutIcon from '@material-ui/icons/HighlightOff';
import VendorIcon from '@material-ui/icons/CardTravel';
import GavelIcon from '@material-ui/icons/Gavel';
import TaskIcon from "@material-ui/icons/List";

export default function Nav() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <HomeIcon />
          </li>
          <li>
            <VendorIcon />
          </li>
          <li>
            <GavelIcon />
          </li>
          <li>
            <TaskIcon />
          </li>
          <li>
            <LogoutIcon />
          </li>
        </ul>
      </nav>
    </>
  )
}
