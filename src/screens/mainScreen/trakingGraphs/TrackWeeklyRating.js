// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const NotificationBlock = ({ notifications }) => {
//   return (
//     <View style={styles.notificationBlock}>
//       {notifications.map(notification => (
//         <View key={notification.date} style={styles.notification}>
//           <Text style={styles.notificationDate}>{notification.date}</Text>
//           <Text style={styles.notificationDescription}>{notification.previous_week_description}</Text>
//           <Text style={styles.notificationRating}>Rating: {notification.weekly_rating}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// const App = () => {
//   const [notificationsByMonth, setNotificationsByMonth] = useState({});

//   useEffect(() => {
//     // Simulating API data
//     const data = [
//       {
//         "week": 22,
//         "date": "2023-05-31",
//         "previous_week_description": "setsetsetsetse",
//         "weekly_rating": 4
//       },
//       {
//         "week": 22,
//         "date": "2023-05-04",
//         "previous_week_description": "setsetsetsetse",
//         "weekly_rating": 4
//       },
//       {
//         "week": 23,
//         "date": "2023-06-11",
//         "previous_week_description": "setsetsetsetse",
//         "weekly_rating": 4
//       },
//       {
//         "week": 12,
//         "date": "2023-07-31",
//         "previous_week_description": "setsetsetsetse",
//         "weekly_rating": 4
//       }
//     ];

//     const groupedNotifications = {};

//     data.forEach(notification => {
//       const date = new Date(notification.date);
//       const year = date.getFullYear();
//       const month = date.toLocaleString('default', { month: 'long' });
//       const key = `${year}-${month}`;
//       if (groupedNotifications[key]) {
//         groupedNotifications[key].push(notification);
//       } else {
//         groupedNotifications[key] = [notification];
//       }
//     });

//     setNotificationsByMonth(groupedNotifications);
//   }, []);

//   return (
//     <View style={styles.container}>
//       {Object.keys(notificationsByMonth).map(monthKey => (
//         <View key={monthKey}>
//           <Text style={styles.monthHeader}>{monthKey}</Text>
//           <NotificationBlock notifications={notificationsByMonth[monthKey]} />
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   monthHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//     marginBottom: 5,
//     color:"#000"
//   },
//   notificationBlock: {
//     backgroundColor: '#f5f5',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   notification: {
//     marginBottom: 5,
//   },
//   notificationDate: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 2,
//     color:"#000"
//   },
//   notificationDescription: {
//     fontSize: 14,
//     marginBottom: 2,
//     color:"#000"

//   },
//   notificationRating: {
//     fontSize: 14,
//     color: 'green',
//   },
// });

// export default App;

//  update with the weks
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const NotificationBlock = ({ notifications }) => {
//   return (
//     <View style={styles.notificationBlock}>
//       {notifications.map(notification => (
//         <View key={notification.date} style={styles.notification}>
//           <Text style={styles.notificationDate}>{`Week ${calculateWeekInMonth(notification.date)}`}</Text>
//           <Text style={styles.notificationDescription}>{notification.previous_week_description}</Text>
//           <Text style={styles.notificationRating}>Rating: {notification.weekly_rating}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// const calculateWeekInMonth = (dateString) => {
//   const date = new Date(dateString);
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1;
//   const week = Math.ceil(date.getDate() / 7);

//   // Calculate the week number within the month
//   const weekInMonth = week - Math.floor(new Date(year, month - 1, 1).getDate() / 7) + 1;

//   return weekInMonth;
// };

// const App = () => {
//   const [notificationsByMonth, setNotificationsByMonth] = useState({});

//   useEffect(() => {
//     // Simulating API data
//     const data = [
//       {
//         "week": 18,      
//         "date": "2023-05-01",
//         "previous_week_description": "setsetsetsetse",
//         "weekly_rating": 4
//       },
//       {
//         "week": 19,
//         "date": "2023-05-08",
//         "previous_week_description": "setsetsetsetse",
//         "weekly_rating": 4
//       },
//       {
//         "week": 20,
//         "date": "2023-05-15",
//         "previous_week_description": "setsetsetsetse",
//         "weekly_rating": 4
//       },
//       {
//         "week": 21,
//         "date": "2023-05-22",
//         "previous_week_description": "setsetsetsetse",
//         "weekly_rating": 4
//       }
//     ];

//     const groupedNotifications = {};

//     data.forEach(notification => {
//       const date = new Date(notification.date);
//       const year = date.getFullYear();
//       const month = date.toLocaleString('default', { month: 'long' });

//       const key = `${year}-${month}`;
//       if (groupedNotifications[key]) {
//         groupedNotifications[key].push(notification);
//       } else {
//         groupedNotifications[key] = [notification];
//       }
//     });

//     setNotificationsByMonth(groupedNotifications);
//   }, []);

//   return (
//     <View style={styles.container}>
//       {Object.keys(notificationsByMonth).map(monthKey => (
//         <View key={monthKey}>
//           <Text style={styles.monthHeader}>{monthKey}</Text>
//           <NotificationBlock notifications={notificationsByMonth[monthKey]} />
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 10,
//     },
//     monthHeader: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       marginTop: 10,
//       marginBottom: 5,
//       color:"#000"
//     },
//     notificationBlock: {
//       backgroundColor: '#f5f5',
//       borderRadius: 5,
//       padding: 10,
//       marginBottom: 10,
//     },
//     notification: {
//       marginBottom: 5,
//     },
//     notificationDate: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       marginBottom: 2,
//       color:"#000"
//     },
//     notificationDescription: {
//       fontSize: 14,
//       marginBottom: 2,
//       color:"#000"

//     },
//     notificationRating: {
//       fontSize: 14,
//       color: 'green',
//     },
//   });
// export default App;

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const NotificationBlock = ({ notifications }) => {
//   return (
//     <View style={styles.notificationBlock}>
//       {notifications.map(notification => (
//         <View key={notification.date} style={styles.notification}>
//           <Text style={styles.notificationDate}>{`Week ${calculateWeekInMonth(notification.date)}`}</Text>
//           <Text style={styles.notificationDescription}>{notification.previous_week_description}</Text>
//           <Text style={styles.notificationRating}>Rating: {notification.weekly_rating}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// const calculateWeekInMonth = (dateString) => {
//   const date = new Date(dateString);
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1;

//   // Calculate the week number within the month
//   const firstDayOfMonth = new Date(year, month - 1, 1);
//   const firstDayOfWeek = firstDayOfMonth.getDay() || 7; // Convert Sunday to 7
//   const diff = date.getDate() + firstDayOfWeek - 2;
//   const weekNumber = Math.floor(diff / 7) + 1;

//   return weekNumber;
// };

// const App = () => {
//   const [notificationsByMonth, setNotificationsByMonth] = useState({});

//   useEffect(() => {
//     // Simulating API data
//     const data = [
//       {
//         "week": 10,
//         "date": "2023-03-06",
//         "previous_week_description": "setsetsetsetse",
//         "weekly_rating": 4
//       },
//       {
//         "week": 19,
//         "date": "2023-05-08",
//         "previous_week_description": "setsetsetsetse",
//         "weekly_rating": 4
//       },
//       {
//         "week": 20,
//         "date": "2023-05-15",
//         "previous_week_description": "setsetsetsetse",
//         "weekly_rating": 4
//       },
//       {
//         "week": 21,
//         "date": "2023-05-22",
//         "previous_week_description": "setsetsetsetse",
//         "weekly_rating": 4
//       }
//     ];

//     const groupedNotifications = {};

//     data.forEach(notification => {
//       const date = new Date(notification.date);
//       const year = date.getFullYear();
//       const month = date.toLocaleString('default', { month: 'long' });

//       const key = `${year}-${month}`;
//       if (groupedNotifications[key]) {
//         groupedNotifications[key].push(notification);
//       } else {
//         groupedNotifications[key] = [notification];
//       }
//     });

//     setNotificationsByMonth(groupedNotifications);
//   }, []);

//   return (
//     <View style={styles.container}>
//       {Object.keys(notificationsByMonth).map(monthKey => (
//         <View key={monthKey}>
//           <Text style={styles.monthHeader}>{monthKey}</Text>
//           <NotificationBlock notifications={notificationsByMonth[monthKey]} />
//         </View>
//       ))}
//     </View>
//   );
// };

//  const styles = StyleSheet.create({
//       container: {
//         flex: 1,
//         padding: 10,
//       },
//       monthHeader: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginTop: 10,
//         marginBottom: 5,
//         color:"#000"
//       },
//       notificationBlock: {
//         backgroundColor: '#f5f5',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 10,
//       },
//       notification: {
//         marginBottom: 5,
//       },
//       notificationDate: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 2,
//         color:"#000"
//       },
//       notificationDescription: {
//         fontSize: 14,
//         marginBottom: 2,
//         color:"#000"

//       },
//       notificationRating: {
//         fontSize: 14,
//         color: 'green',
//       },
//     });
//     export default App;


// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { format, parseISO, getWeek, getWeekOfMonth } from 'date-fns';

// const NotificationBlock = ({ notifications }) => {
//   return (
//     <View style={styles.notificationBlock}>
//       {notifications.map(notification => (
//         <View key={notification.date} style={styles.notification}>
//           <Text style={styles.notificationDate}>{`Week ${getWeekOfMonth(parseISO(notification.date))}`}</Text>
//           <Text style={styles.notificationDescription}>{notification.previous_week_description}</Text>
//           <Text style={styles.notificationRating}>Rating: {notification.weekly_rating}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// const App = () => {
//   const [notificationsByMonth, setNotificationsByMonth] = useState({});

//   useEffect(() => {
//     const data = [
//       {
//         "week": 10,
//         "date": "2023-03-06",
//         "previous_week_description": "setsetsetsetse",
//         "weekly_rating": 4
//       },
//       {
//         "week": 19,
//         "date": "2023-05-08",
//         "previous_week_description": "setsetsetsetse",
//         "weekly_rating": 4
//       },
//       {
//         "week": 20,
//         "date": "2023-05-15",
//         "previous_week_description": "setsetsetsetse",
//         "weekly_rating": 4
//       },
//       {
//         "week": 21,
//         "date": "2023-05-22",
//         "previous_week_description": "setsetsetsetse",
//         "weekly_rating": 4
//       }
//     ];

//     const groupedNotifications = {};

//     data.forEach(notification => {
//       const date = parseISO(notification.date);
//       const year = format(date, 'yyyy');
//       const month = format(date, 'MMMM');

//       const key = `${year}-${month}`;
//       if (groupedNotifications[key]) {
//         groupedNotifications[key].push(notification);
//       } else {
//         groupedNotifications[key] = [notification];
//       }
//     });

//     setNotificationsByMonth(groupedNotifications);
//   }, []);

//   return (
//     <View style={styles.container}>
//       {Object.keys(notificationsByMonth).map(monthKey => (
//         <View key={monthKey}>
//           <Text style={styles.monthHeader}>{monthKey}</Text>
//           <NotificationBlock notifications={notificationsByMonth[monthKey]} />
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   monthHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//     marginBottom: 5,
//     color:"#000"
//   },
//   notificationBlock: {
//     backgroundColor: '#f5f5',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   notification: {
//     marginBottom: 5,
//   },
//   notificationDate: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 2,
//     color:"#000"
//   },
//   notificationDescription: {
//     fontSize: 14,
//     marginBottom: 2,
//     color:"#000"

//   },
//   notificationRating: {
//     fontSize: 14,
//     color: 'green',
//   },
// });
// export default App;
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Platform } from 'react-native';
import { format, parseISO, getISOWeek, getMonth, getYear, startOfMonth } from 'date-fns';
import MainHeader from '../../../components/MainHeader';
import { commonStyles, fontScalingFactor, windowWidth } from '../../../components/CommonStyles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../../../components/Colors';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUserWeeklyRating } from '../../../../redux/actions/mainAction';

const NotificationBlock = ({ notifications }) => {
  return (
    <View style={[styles.notificationBlock, { marginVertical: 10 }]}>
      {notifications.map(notification => (
        <View style={{ marginVertical: 5, backgroundColor: colors.black + "11", borderRadius: scale(6), paddingHorizontal: scale(10), paddingTop: verticalScale(5) }}>

          <View key={notification.date} style={styles.notification}>
            <Text style={styles.notificationDate}>{`Week ${getWeekWithinMonth(parseISO(notification.date))}`}</Text>
            <Text style={styles.notificationRating}>Rating: {notification.weekly_rating}</Text>
            <Text style={styles.notificationDescription}>Word of the week: {notification.previous_week_description}</Text>
          </View>
          {/* <View key={notification.date} style={styles.notification}>
            <Text style={styles.notificationDate}>{`Week ${getWeekWithinMonth(parseISO(notification.date))}`}</Text>
            <Text style={styles.notificationRating}>Rating: {notification.weekly_rating}</Text>
            <View style={{
              flexDirection: 'column', borderWidth: 0.5, padding: scale(10), marginTop: verticalScale(10), borderColor: colors.greyText,
              borderBottomLeftRadius: scale(15), backgroundColor: colors.white
            }}>

              <Text style={[styles.notificationDescription, { fontWeight: "500", alignSelf: "center", color: colors.signUpBtn }]}>Week description </Text>
              <Text style={[styles.notificationDescription, { alignSelf: "center" }]}> {notification.previous_week_description}</Text>
            </View>
          </View> */}
        </View>
      ))}
    </View>
  );
};

const getWeekWithinMonth = (date) => {
  const monthStart = startOfMonth(date);
  const weekStart = getISOWeek(monthStart);

  return getISOWeek(date) - weekStart + 1;
};

const App = () => {
  const dispatch = useDispatch()
  const [notificationsByMonth, setNotificationsByMonth] = useState({});
  const token = useSelector(state => state.auth.accessToken)
  const [data, setData] = useState([])
  useEffect(() => {
    // const data = [
    //   {
    //     "week": 10,
    //     "date": "2023-03-06",
    //     "previous_week_description": "setsetsetsetse",
    //     "weekly_rating": 4
    //   },
    //   {
    //     "week": 19,
    //     "date": "2023-04-08",
    //     "previous_week_description": "setsetsetsetse",
    //     "weekly_rating": 4
    //   },
    //   {
    //     "week": 20,
    //     "date": "2023-05-15",
    //     "previous_week_description": "setsetsetsetse",
    //     "weekly_rating": 4
    //   },
    //   {
    //     "week": 21,
    //     "date": "2023-06-11",
    //     "previous_week_description": "setsetsetsetse",
    //     "weekly_rating": 4
    //   },
    //   {
    //     "week": 21,
    //     "date": "2023-06-22",
    //     "previous_week_description": "setsetsetsetse",
    //     "weekly_rating": 4
    //   }
    // ];

    const groupedNotifications = {};

    data.forEach(notification => {
      const date = parseISO(notification.date);
      const year = format(date, 'yyyy');
      const month = format(date, 'MMMM');

      const key = `${year}-${month}`;
      if (groupedNotifications[key]) {
        groupedNotifications[key].push(notification);
      } else {
        groupedNotifications[key] = [notification];
      }
    });

    setNotificationsByMonth(groupedNotifications);
  }, [data]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://kate.nvinfobase.com/api/tracking_rating_word?year=2023", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result, "fdjkggdsgsdgsdgsdgsdgsdgs")
        setData(result.data)
      })
      .catch(error => console.log('error', error));
  }, [])

  return (
    <SafeAreaView style={commonStyles.mainContainer}>
      <MainHeader backIcon />
      <View style={styles.mainBox}>

        <Text style={styles.title}>Weekly Rating</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            data.length != 0 &&
            <Text style={[styles.title, { alignSelf: 'flex-start', fontWeight: "300", fontSize: moderateScale(13) / fontScalingFactor }]}>Here you can track your added weekly rating.</Text>
          }
          {
            data.length != 0 ?

              Object.keys(notificationsByMonth).map(monthKey => (
                <View key={monthKey}>
                  <Text style={styles.monthHeader}>{monthKey}</Text>
                  <NotificationBlock notifications={notificationsByMonth[monthKey]} />

                </View>
              ))
              :
              <Text style={[styles.title, { alignSelf: 'flex-start', fontWeight: "300", fontSize: moderateScale(13) / fontScalingFactor }]}>You have not added rating yet.</Text>
          }
          <View style={{ height: verticalScale(120) }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  monthHeader: {
    fontSize: moderateScale(18) / fontScalingFactor,
    color: "#000",
    marginTop: verticalScale(6)
  },
  notificationBlock: {
    // backgroundColor:colors.buttonColor+"44",
    borderRadius: 5,
    marginVertical: verticalScale(5)
  },
  notification: {
    marginBottom: verticalScale(20),
    padding: 4
  },
  notificationDate: {
    fontSize: moderateScale(14) / fontScalingFactor,
    fontWeight: 'bold',
    marginBottom: 2,
    color: "#000",
  },
  notificationDescription: {
    fontSize: moderateScale(11) / fontScalingFactor,
    marginBottom: 2,
    color: colors.black,
    fontWeight: "300"

  },
  notificationRating: {
    fontSize: moderateScale(10) / fontScalingFactor,
    color: colors.buttonColor,
  },
  title: {
    fontSize: moderateScale(20) / fontScalingFactor,
    // marginTop: scale(20),
    color: colors.signUpBtn,
    fontWeight: "700",
    marginVertical: verticalScale(10),
    alignSelf: "center"
  },
  mainBox: {
    width: windowWidth,
    paddingHorizontal: scale(20),
  },
});
export default App;

