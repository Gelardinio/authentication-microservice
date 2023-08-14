import './fonts.css';

const styles = {
    appContainer: {

    },
    titleBar: {
        width: '100%',
        height: '50px',
        color: '#bebebe',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        border: '2px solid #bebebe',

    },
    textTitle: {
        fontFamily: 'OpenSans',
        color: '#444444', 
        fontSize: '25px',
        paddingLeft: '20px'
    },
    mainContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%',
    },
    leftContainer: {
      width: '70%',
      padding: '20px',
    },
    calendarSelection: {
      width: '30%',
      padding: '20px',
      backgroundColor: '#f2f2f2',
    },
    statisticsBar: {
      width: '20%',
      padding: '20px',
      backgroundColor: '#f2f2f2',
    },
  };
  
  export default styles;
  