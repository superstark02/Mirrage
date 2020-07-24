import '../../CSS/Components/Home/AttributeTabs.css'
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { db } from '../../../firebase'
import { BiorythmicCalculations } from '../../Logic/BiorythmCalculations'
import { Percentage } from '../../Logic/Percentage'
import { Maximum } from '../../Logic/CalculateMaxima'
import { Radar } from '../Charts/Guage';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{ overflow: "visible", padding: "10px", backgroundColor: "#f8f3f0" }} >
          <Typography style={{ backgroundColor: "#f2efed" }} >{children}</Typography>
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function AttributeTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [max, setMax] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    var functions = []
    var biorythm_results = []
    var percentage_results


    //getting functions from db.
    db.collection("Functions").doc("Primary").collection("Functions").get().then(snapshot => {
      snapshot.forEach(doc => {
        functions.push(doc.data())
      })

      for (var i = 0; i < functions.length; i++) {
        biorythm_results.push({ name: functions[i].name, value: BiorythmicCalculations(functions[i].const, props.number_of_days_lived) })
      }

      percentage_results = Percentage(biorythm_results)

      var sortedArray = Maximum(percentage_results)

      setMax(sortedArray)

      //getting sounds from db.
      db.collection("Functions").doc("SoundVolumes").collection(sortedArray[0].name).get().then(snapshot => {
        var sounds = []
        snapshot.forEach(doc => {
          sounds.push(doc.data())
        })
      })

    })

  })

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} >
        <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="simple tabs example" style={{ backgroundColor: "#f8f3f0", color: "#a56227", borderColor: "#a56227" }} >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className="song-list-container wrap" >
          <div className="song-list-sub-container" >
            {
              max === null ? (
                <div>Pleasse Wait...</div>
              ) : (
                  <div>
                    <div>
                      {max[0].name} : {max[0].value}
                    </div>
                    <div className="wrap" >
                      <Radar data={[max[0].value / 100, 1 - max[0].value / 100]} />
                      <div className="volume-slider-container" >

                      </div>
                    </div>
                  </div>
                )
            }
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="song-list-container wrap" >
          <div className="song-list-sub-container" >
            {
              max === null ? (
                <div>Pleasse Wait...</div>
              ) : (
                  <div>
                    <div>
                      {max[1].name} : {max[1].value}
                    </div>
                    <div className="wrap" >
                      <Radar data={[max[1].value / 100, 1 - max[1].value / 100]} />
                      <div className="volume-slider-container" >

                      </div>
                    </div>
                  </div>
                )
            }
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="song-list-container wrap" >
          <div className="song-list-sub-container" >
            {
              max === null ? (
                <div>Pleasse Wait...</div>
              ) : (
                  <div>
                    <div>
                      {max[2].name} : {max[2].value}
                    </div>
                    <div className="wrap" >
                      <Radar data={[max[2].value / 100, 1 - max[2].value / 100]} />
                      <div className="volume-slider-container" >

                      </div>
                    </div>
                  </div>
                )
            }
          </div>
        </div>
      </TabPanel>
    </div>
  );
}