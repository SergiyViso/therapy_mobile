import {
    FlatList,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React, { useEffect, useState, useRef } from 'react';
  import {
    commonStyles,
    errorToast,
    fontScalingFactor,
    windowHeight,
    windowWidth,
  } from '../../../components/CommonStyles';
  import MainHeader from '../../../components/MainHeader';

  // import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
  import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

  import { LineChart } from 'react-native-chart-kit';
  import { colors } from '../../../components/Colors';
  import DropDownComponent from '../../../components/DropDownComponent';
  import { useDispatch, useSelector } from 'react-redux';
  import CommonButtons from '../../../components/CommonButtons';
  import { images } from '../../../components/Images';
  import { getGoalsToTrack, getSymptomToTrack } from '../../../../redux/actions/mainAction';
  import moment from 'moment';
  import { Modal } from 'react-native';
  import { monthList, weekList, yearList } from '../../../utils/utils';
  import LoadingComponent from '../../../components/LoadingComponent'
  import { TouchableOpacity } from 'react-native';

  const GoalsGraph = () => {
    const userSymptomList = useSelector(state => state.main.userGoals);
    const graphSymptomList = useSelector(state => state.main.graphSymptomList);
    const token = useSelector(state => state.auth.accessToken);
    const [selectedSymptom, setSelectedSymptom] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState();
    const [symptomId, setsymptomId] = useState('');
    const [innerData, setInnerData] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [selectedYear, setSelectedYear] = useState('2023');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedWeek, setSelectedWeek] = useState('1');
    const [loader, setLoader] = useState(false);
    const [commentsArr, setCommentsArr] = useState([]);

    const listof = selectedIndex == 0 ? "Year" : selectedIndex == 1 ? "Month" : ""
    // const selectedWeek = useRef('');
    const [dateModal, setDateModal] = useState(false);

    // alert(symptomId)
    const [labelss, setLabels] = useState([
      'Sun',
      'Mon',
      'Tues',
      'Wed',
      'Thus',
      'Fri',
      'Sat',
    ]);
    const barData1 = {
      labels: labelss,
      datasets: [
        {
          data: innerData,
          color: (opacity = 1) => `rgba(134, 233, 244, ${opacity})`, // optional
          strokeWidth: 1,
        },
      ],
    };

    const btns = [
      { id: 0, title: 'Yearly' },
      { id: 1, title: 'Monthly' },
      { id: 2, title: 'Weekly' },
    ];


    const dispatch = useDispatch();
    // alert(selectedIndex)
    async function handleData(arr) {
      // alert(JSON.stringify(arr))
      const ratings = await arr.map((el, ind) => {
        return el.rating
      })
      if (selectedIndex == 0) {
        // alert("in0")
        const months = await arr.map((el, ind) => {
          return el.month.substring(0,3)
        })
        setLabels(months)
      } else if (selectedIndex == 1) {
        // alert("in1")
        const week = await arr.map((el, ind) => {
          return `${"week-"}${el.week}`
        })
        setLabels(week)
      } else if (selectedIndex == 2) {
        // alert("in2")
        const daily = await arr.map((el, ind) => {
          console.log(el, "ellllllllll");
          return el.day
        })
        setLabels(daily)
      }
      // alert(ratings)
      setInnerData(ratings)
    }
    const [selectedTab, setSelectedTab] = useState("year")
    const getSymptomApi = async () => {
      if (symptomId == '') {
        errorToast('Please select goals to Track!');
      } else {
        // var selectedTab
        if (selectedIndex == 0) {
          setSelectedTab('year')
        } else if (selectedIndex == 1) {
          setSelectedTab('yearwithmonth')

        } else if (selectedIndex == 2) {
          setSelectedTab('yearwithmonth')
        }

        //   var formdata = new FormData();

        //   if (selectedIndex == 0) {
        //     formdata.append('year', '2022');
        //     formdata.append('tabValue', selectedTab);
        //   } else {
        //     formdata.append('month', '1');
        //     formdata.append('year', '2023');
        //     formdata.append('tabValue', selectedTab);
        //   }
        //   console.log('FORMDATA --->>> ', formdata);
        //   await dispatch(getSymptomToTrack(token, formdata, symptomId)).then(async (
        //     res) => {
        //     console.log('API DATA --->>> ', res);
        //     if (selectedIndex == 0) {
        //       const convertedData = await convert(res);
        //       await handleData(convertedData)
        //     }
        //     if (selectedIndex == 1) {
        //       await handleData(res)
        //     }
        //     if (selectedIndex == 2) {
        //       const keyValue = (input) => Object.entries(input).map(([key, value]) => {
        //         return {
        //           day: `${key}/1`,
        //           rating: value
        //         }
        //       })
        //       await handleData(keyValue(res[1].daily))
        //     }
        //   },
        //   );
      }
    };

    useEffect(() => {
      getGraphData(symptomId)
    }, [selectedYear, selectedMonth, symptomId, selectedIndex, selectedWeek])


   async function fillMissingMonths(data) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const filledData = [];
    let prevRating = 0;

    for (let i = 0; i < months.length; i++) {
      const month = months[i];
      const existingData = data.find(obj => obj.month.substring(0, 3) === month);

      if (existingData) {

        filledData.push(existingData);
        prevRating = existingData.rating;
      } else {
        filledData.push({
          month: month,
          rating: 0,
          comment: [""]
        });
        prevRating = 0;
      }
    }

    return filledData;
  }

  function extractData(data) {
    const ratingsArray = data.map(item => {
      const dailyRatings = Object.values(item.daily).map(dailyItem => dailyItem.rating);
      const sum = dailyRatings.reduce((total, rating) => total + rating, 0);
      const average = sum / dailyRatings.length;
      return Math.round(average * 10) / 10; // Round to one decimal place
    });

    const commentsArray = data.map(item => {
      const dailyComments = Object.values(item.daily).map(dailyItem => dailyItem.comment);
      const nonNullComments = dailyComments.filter(comment => comment !== null);
      const lastComment = nonNullComments.length > 0 ? nonNullComments[nonNullComments.length - 1] : "";
      return lastComment;
    });

    const weeksArray = data.map(item => "Week " + item.week);

    return [ratingsArray, commentsArray, weeksArray];
  }
    function formatDate(date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      return `${day}/${month}`;
    }

    function getDatesAndRatingsByWeekNumber(data, weekNumber, month) {
      const weekData = data.find(obj => obj.week === weekNumber);
      const dailyData = weekData.daily;
      const dates = Object.keys(dailyData).map(day => {
        const formattedDate = formatDate(new Date(2000, month - 1, parseInt(day, 10)));
        return formattedDate;
      });
      const ratings = Object.values(dailyData).map(day => day.rating);
      const comments = Object.values(dailyData).map(day => day.comment);
      return { dates, ratings, comments };
    }
    const getGraphData = async (symptomId) => {
      // alert(symptomId)
      if (symptomId == '') {
        errorToast('Please select goals to Track!');
      } else {
        var formdata = new FormData();
        if (selectedIndex == 0) {
          formdata.append('year', selectedYear);
          formdata.append('tabValue', "year");
        } else {
          formdata.append('month', selectedMonth ? selectedMonth : '6');
          formdata.append('year', selectedYear ? selectedYear : '2023');
          formdata.append('tabValue', "yearwithmonth");
        }
        console.log('FORMDATA -------->>> ',token, formdata,symptomId);
        try {
          // setLoader(true)

          await dispatch(getGoalsToTrack(token, formdata, symptomId)).then(async (
            res) => {
            // alert("inn")
            console.log('Amy datatatatataa------>', JSON.stringify(res));
            // alert("injk")
            if (selectedIndex == 0) {
              // alert("0")
              // const convertedData = await convert(res);
              const convertedData = await fillMissingMonths(res);
              const comments = convertedData.flatMap(obj => obj.comment);
              // console.log(comments);
              // alert(comments)
              setCommentsArr(comments)
              // alert(convertedData.length)
              await handleData(convertedData)
              // setLoader(false)
            }
            if (selectedIndex == 1) {
              // alert("1")
              // await handleData(res)
              const [ratingsArray, commentsArray, weeksArray] = extractData(res);
              setLabels(weeksArray)
              setInnerData(ratingsArray)
              setCommentsArr(commentsArray)
              setLoader(false)
            }
            if (selectedIndex == 2) {
              // alert("2")
              const { dates, ratings, comments } = await getDatesAndRatingsByWeekNumber(res, selectedWeek, selectedMonth ? selectedMonth : "5");
              //  console.log(dates);    // ["14/01", "15/01", "16/01", "17/01", "18/01", "19/01", "20/01"]
              //  console.log(ratings);
              // const keyValue = (input) => Object.entries(input).map(([key, value]) => {
              //   return {
              //     day: `${key}/1`,
              //     rating: value
              //   }
              // })
              // await handleData(keyValue(res[selectedWeek]?.daily?res[selectedWeek]?.daily:[]))
              // const [ratingsArray, weeksArray] =await extractData(res);
              console.log(comments);
              const convertedArray = await dates.map(el => {
                const [day, month] = el.split('/');
                return `${month}/${day}`;
              });
              setCommentsArr(comments)
              setLabels(convertedArray)
              setInnerData(ratings)
              setLoader(false)
            }
            // setLoader(false)
          },
          ).catch(e => {
            console.log(e, "ouoiooioi");
            // setLoader(false)
            if (selectedIndex == 0) {
              setLabels(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])
              setInnerData([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
            }
          })
        } catch (error) {
          console.log(error, "ewfgasfasfasfasfasfasfasfasfasf");
          if (selectedIndex == 0) {
            setLabels(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])
            setInnerData([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
          }
          // setLoader(false)
        }
      }
    }
    // alert(selectedIndex)

    const handleSectedBtn = index => {
      setDateModal(true)
      getSymptomApi()
      setSelectedIndex(index);
    };
    // useEffect(() => {
    //   getSymptomApi();
    // }, [selectedIndex])


    function convert(data) {
      console.log(data, "datatattatatatatata");
      alert("inn")
      data.forEach((element, index) => {
        data[index].month = moment().month(data[index].month).format("M");
      });
      var prevRating = 0;
      for (var i = 1; i <= 12; i++) {
        var existObj = data.find(item => +item.month === i);
        if (existObj) {
          prevRating = existObj.rating;
        }
        if (!existObj) {
          data.push({
            month: i,
            rating: prevRating,
          });
        }
      }
      data.sort(function (a, b) {
        return +a.month - +b.month;
      });
      data.forEach((element, index) => {
        data[index].month = toMonthName(data[index].month);
      });
      return data
    }


    function toMonthName(monthNumber) {
      const date = new Date();
      date.setMonth(monthNumber - 1);

      return date.toLocaleString('en-US', {
        month: 'short',
      });
    }
    const handlePress = (item) => {
      if (selectedIndex == 0) {
        setSelectedYear(item.title)
        setDateModal(false)
      } else if (selectedIndex == 2) {
        setSelectedWeek(item.id)
        setDateModal(false)
      } else {
        setSelectedMonth(item.month)
        setDateModal(false)
      }
    }
    const renderList = ({ item, index }) => {
      return (
        <>
          <Text onPress={() => handlePress(item)} style={styles.list}>{item.title}</Text>
        </>
      )
    }
    const handleSymptomPress = (id) => {
      setsymptomId(id)
      // alert(id)
  }
    const onDotPress = (data) => {
        if (symptomId == '') {
            errorToast('Please select goals to Track!');
        } else {
            // alert("hjj")
            if (commentsArr.length != 0) {
          if (commentsArr[data.index] == null ||commentsArr[data.index] == "") {
            alert("data is null")
          } else {

            alert("Your added comment:- "+commentsArr[data.index])
          }
        }

      }
    }
    return (
      <SafeAreaView style={commonStyles.mainContainer}>
        <MainHeader backIcon />
        {loader && <LoadingComponent />}
        <ScrollView>

          {/* <<<<<<<<<<<<<< Symptoms Graph >>>>>>>>>>>>> */}

          <Text style={styles.screenTitle}>Monitor your Goals</Text>
          <View style={styles.innerContentBox}>
            <DropDownComponent
              value={selectedSymptom}
              onSetValue={value => setSelectedSymptom(value)}
              idOfSelectedItem={id => handleSymptomPress(id)}
              listToRender={userSymptomList}
              placeholder="Select goals to track"
            />
            <View style={styles.btnBox}>
              {btns.map((item, index) => {
                return (
                  <CommonButtons
                    title={item.title}
                    customStyle={styles.btnStyle(index, selectedIndex)}
                    customText={styles.btnText}
                    onPress={() => handleSectedBtn(item.id)}
                  />
                );
              })}
            </View>
            <LineChart
              data={barData1}
              width={windowWidth - scale(40)} // from react-native
              height={windowHeight / 3}
              // yAxisLabel="$"
              // withScrollableDot
              withHorizontalLines={true}
              // yAxisSuffix="%"
              yAxisInterval={0.4} // optional, defaults to 1
              onDataPointClick={(res) => {
                onDotPress(res)
                // alert(JSON.stringify(res))
              }}
              chartConfig={{
                backgroundColor: colors.black,
                backgroundGradientFrom: "#dedede",
                backgroundGradientTo: "#dedede",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `#00000066`,
                labelColor: (opacity = 1) => `black`,

                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '5',
                  strokeWidth: '6',
                  stroke: colors.black,
                },

              }}
              // bezier
              style={{
                // marginVertical: 8,
                borderRadius: 16,

                // marginHorizontal: scale(10)
              }}
            />


            {/* <<<<<<<<<<<<<< Goals Graph >>>>>>>>>>>>> */}


            {/* <Text style={styles.screenTitle}>Monitor your Goals</Text>
            <View style={styles.innerContentBox}>
              <DropDownComponent
                value={selectedSymptom}
                onSetValue={value => setSelectedSymptom(value)}
                idOfSelectedItem={id => handleSymptomPress(id)}
                listToRender={userSymptomList}
                placeholder="Select Symptoms"
              />
              <View style={styles.btnBox}>
                {btns.map((item, index) => {
                  return (
                    <CommonButtons
                      title={item.title}
                      customStyle={styles.btnStyle(index, selectedIndex)}
                      customText={styles.btnText}
                      onPress={() => handleSectedBtn(item.id)}
                    />
                  );
                })}
              </View>
              <LineChart
                data={barData1}
                width={windowWidth - scale(40)} // from react-native
                height={windowHeight / 3}
                // yAxisLabel="$"
                withHorizontalLines={true}
                // yAxisSuffix="%"
                // verticalLabelRotation={50}
                yAxisInterval={0.2} // optional, defaults to 1
                onDataPointClick={(res) => {
                  onDotPress(res)
                  // alert(JSON.stringify(res))
                }}
                chartConfig={{
                  backgroundColor: colors.buttonColor,
                  backgroundGradientFrom: colors.signUpBtn,
                  backgroundGradientTo: colors.buttonColor,
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, 0.4)`,
                  labelColor: (opacity = 1) => `rgba(244, 255, 255, 1)`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '4',
                    stroke: colors.white,
                  },
                }}
                // bezier
                style={{
                  // marginVertical: 8,
                  borderRadius: 16,

                  // marginHorizontal: scale(10)
                }}
              />



            </View> */}




          </View>
          <Image
            source={images.monitorrProgress}
            style={{
              height: windowHeight / 4,
              width:Platform.isPad?verticalScale(250):windowWidth/1.3,
              top: 10,
              alignSelf: 'center',
            }}
            resizeMode='contain'
          />
          <View style={{ height: scale(50) }}></View>
        </ScrollView>

        {/* Modallll */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={dateModal}
          onRequestClose={() => {
            setDateModal(!dateModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => setDateModal(false)} style={{ position: "absolute", top: scale(10), right: scale(10), }}>

                <Image
                  source={images.cross}
                  resizeMode='stretch'
                  style={{ height: scale(16), width: scale(16), tintColor: colors.black }}
                />
              </TouchableOpacity>
              <Text style={{ fontSize: moderateScale(18) / fontScalingFactor, color: colors.buttonColor }}>Please select {listof}</Text>
              <FlatList
                data={selectedIndex == 0 ? yearList : selectedIndex == 1 ? monthList : weekList}
                keyExtractor={item => item.id}
                renderItem={renderList}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    );
  };

  export default GoalsGraph;

  const styles = StyleSheet.create({
    screenTitle: {
      fontSize: moderateScale(20) / fontScalingFactor,
      alignSelf: 'center',
      fontWeight: '600',
      color: colors.signUpBtn,
      marginVertical: scale(10),
    },
    innerContentBox: {
      width: windowWidth - scale(40),
      alignSelf: 'center',
      // backgroundColor: "#87587822",
    },
    btnBox: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: scale(25),
      marginHorizontal: scale(10),
      marginBottom: scale(20),
      marginTop: scale(10),
      // backgroundColor: "#fff"
    },
    btnStyle: (index, selectedIndex) => {
      return {
        backgroundColor:
          index == selectedIndex ? colors.signUpBtn : colors.buttonColor,
        borderRadius: scale(6),
        width: windowWidth / 4.5,
        alignSelf: 'center',
        height: scale(25),
      };
    },
    btnText: { fontSize: moderateScale(10) / fontScalingFactor },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: scale(20),
      backgroundColor: colors.white,
      borderRadius: scale(20),
      padding: scale(35),
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height: windowHeight / 2,
      width: windowWidth / 1.5
    },
    list: {
      fontSize: moderateScale(16) / fontScalingFactor,
      color: colors.black,
      textDecorationLine: "underline",
      padding: scale(10)
    }
  });

