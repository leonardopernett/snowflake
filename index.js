import { conn, pool } from './db.js'
import cron from 'node-cron'

/* Estilo de aprendizaje --> MDL_SCORM_SCOES_TRACK_CO */
function MDL_SCORM_SCOES_TRACK_CO(){

    cron.schedule('0 3 * * *',() => {
     conn.execute({
        sqlText:`SELECT * FROM DIDACTIK.MOODLE_BI.MDL_SCORM_SCOES_TRACK_CO b WHERE DATE(TO_TIMESTAMP_NTZ(b.timemodified)) BETWEEN DATEADD(day, -5, DATE(GETDATE())) AND DATE(GETDATE()) AND b.scormid = 4670
        AND b.element = 'cmi.interactions_0.student_response'
        AND b.value IS NOT NULL`,
        complete: (err, stmt, rows) => {
          if(err){
            console.log(err.message)
          }else{
            rows.map(async (item) => {
              await pool.query(`INSERT IGNORE INTO mdl_scorm_scoes_track_co (id, userid, scormid, scoid, attempt, element, value, timemodified) VALUES (?, ?, ? ,? ,? ,? ,? ,?)`,[
                item.ID, item.USERID, item.SCORMID, item.SCOID, item.ATTEMPT,item.ELEMENT, item.VALUE, item.TIMEMODIFIED
              ])
            })
            console.log('Estilo de aprendizaje insertado....')
          }

        }
      }) 
    })

}

/* Certificacion --> MDL_CUSTOMCERT_ISSUES_CO */
function MDL_CUSTOMCERT_ISSUES_CO(){
  cron.schedule('0 4 * * *',() => {
    conn.execute({
       sqlText:`select * from DIDACTIK.MOODLE_BI.MDL_CUSTOMCERT_ISSUES_CO b where b.customcertid in(189,367,433,365)`,
       complete: (err, stmt, rows) => {
         if(err){
           console.log(err.message)
         }else{
            rows.map(async (item) => {
             await pool.query(`INSERT IGNORE INTO mdl_customcert_issues_co (id, userid, customcertid, code, emailed, timecreated) VALUES (?,?,?,?,?,?)`,[
               item.ID, item.USERID, item.CUSTOMCERTID, item.CODE, item.EMAILED,item.TIMECREATED
             ])
           }) 
           console.log('certificado insertado...')
         }

       }
     }) 
   })
}

/* user --> MDL_USER_CO */
function MDL_USER_CO(){
  cron.schedule('0 5 * * *',() => {
    conn.execute({
       sqlText:`select * from DIDACTIK.MOODLE_BI.MDL_USER_CO b WHERE DATE(TO_TIMESTAMP_NTZ(b.timemodified)) BETWEEN DATEADD(day, -2, DATE(GETDATE())) AND DATE(GETDATE())`,
       complete: (err, stmt, rows) => {
         if(err){
           console.log(err.message)
         }else{
            rows.map(async (item) => {
             await pool.query(`INSERT IGNORE INTO mdl_user_co (id, auth, confirmed, policyagreed, deleted, suspended, mnethostid, username, password, idnumber, firstname, lastname, email, emailstop, phone1, phone2, institution, department, address, city, country, lang, calendartype, theme, timezone, firstaccess, lastaccess, lastlogin, currentlogin, lastip, secret, picture, description, descriptionformat, mailformat, maildigest,maildisplay, autosubscribe, trackforums, timecreated, timemodified, trustbitmask, imagealt, lastnamephonetic, firstnamephonetic, middlename, alternatename, moodlenetprofile) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,[
              item.ID,
              item.AUTH,
              item.CONFIRMED,
              item.POLICYAGREED,
              item.DELETED,
              item.SUSPENDED,
              item.MNETHOSTID,
              item.USERNAME,
              item.PASSWORD,
              item.IDNUMBER,
              item.FIRSTNAME,
              item.LASTNAME,
              item.EMAIL,
              item.EMAILSTOP,
              item.PHONE1,
              item.PHONE2,
              item.INSTITUTION,
              item.DEPARTMENT,
              item.ADDRESS,
              item.CITY,
              item.COUNTRY,
              item.LANG,
              item.CALENDARTYPE,
              item.THEME,
              item.TIMEZONE,
              item.FIRSTACCESS,
              item.LASTACCESS,
              item.LASTLOGIN,
              item.CURRENTLOGIN,
              item.LASTIP,
              item.SECRETl,
              item.PICTURE,
              item.DESCRIPTION,
              item.DESCRIPTIONFORMAT,
              item.MAILFORMAT,
              item.MAILDIGEST,
              item.MAILDISPLAY,
              item.AUTOSUBSCRIBE,
              item.TRACKFORUMS,
              item.TIMECREATED,
              item.TIMEMODIFIED,
              item.TRUSTBITMASK,
              item.IMAGEALT,
              item.LASTNAMEPHONETIC,
              item.FIRSTNAMEPHONETICl,
              item.MIDDLENAME,
              item.ALTERNATENAME,
              item.MOODLENETPROFILE
             ])
           })  
           console.log('user updated...')
         }

       }
     }) 
   })
}

/* note --> MDL_GRADE_GRADES_CO */
function MDL_GRADE_GRADES_CO(){
  cron.schedule('0 1 * * *',() => { 
    conn.execute({
       sqlText:`SELECT * FROM DIDACTIK.MOODLE_BI.MDL_GRADE_GRADES_CO b WHERE DATE(TO_TIMESTAMP_NTZ(b.timecreated)) BETWEEN DATEADD(day, -2, DATE(GETDATE())) AND DATE(GETDATE()) OR DATE(TO_TIMESTAMP_NTZ(b.timemodified)) BETWEEN DATEADD(day, -2, DATE(GETDATE())) AND DATE(GETDATE())`,
       complete: (err, stmt, rows) => {
         if(err){
           console.log(err.message)
         }else{
           rows.map(async (item) => {
            await pool.query(`INSERT IGNORE INTO mdl_grade_grades_co (id, itemid, userid, rawgrade, rawgrademax, rawgrademin, rawscaleid, usermodified, finalgrade, hidden, locked, locktime, exported, overridden, excluded, feedback, feedbackformat, information, informationformat, timecreated, timemodified, aggregationstatus, aggregationweight) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[
              item.ID,
              item.ITEMID,
              item.USERID,
              item.RAWGRADE,
              item.RAWGRADEMAX,
              item.RAWGRADEMIN,
              item.RAWSCALEID,
              item.USERMODIFIED,
              item.FINALGRADE,
              item.HIDDEN,
              item.LOCKED,
              item.LOCKTIME,
              item.EXPORTED,
              item.OVERRIDDEN,
              item.EXCLUDED,
              item.FEEDBACK,
              item.FEEDBACKFORMAT,
              item.INFORMATION,
              item.INFORMATIONFORMAT,
              item.TIMECREATED,
              item.TIMEMODIFIED,
              item.AGGREGATIONSTATUS,
              item.AGGREGATIONWEIGHT
            ])
          }) 
           console.log('notas creadas...')
         }

       }
     }) 
   }) 
}

/* MDL_COURSE_CO */
function MDL_COURSE_CO(){

  cron.schedule('0 21 * * *',() => {
   conn.execute({
      sqlText:`SELECT * FROM DIDACTIK.MOODLE_BI.MDL_COURSE_CO`,
      complete: (err, stmt, rows) => {
        if(err){
          console.log(err.message)
        }else{
          rows.map(async (item) => {
            await pool.query(`INSERT IGNORE INTO mdl_course_co (id, category, sortorder, fullname, shortname, idnumber, summary, summaryformat, format, showgrades, newsitems, startdate, enddate, relativedatesmode, marker, maxbytes, legacyfiles, showreports, visible, visibleold, downloadcontent, groupmode, groupmodeforce, defaultgroupingid, lang, calendartype, theme, timecreated, timemodified, requested, enablecompletion, completionnotify, cacherev, originalcourseid, showactivitydates, showcompletionconditions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,[
              item.ID,
              item.CATEGORY,
              item.SORTORDER,
              item.FULLNAME,
              item.SHORTNAME,
              item.IDNUMBER,
              item.SUMMARY,
              item.SUMMARYFORMAT,
              item.FORMAT,
              item.SHOWGRADES,
              item.NEWSITEMS,
              item.STARTDATE,
              item.ENDDATE,
              item.RELATIVEDATESMODE,
              item.MARKER,
              item.MAXBYTES,
              item.LEGACYFILES,
              item.SHOWREPORTS,
              item.VISIBLE,
              item.VISIBLEOLD,
              item.DOWNLOADCONTENT,
              item.GROUPMODE,
              item.GROUPMODEFORCE,
              item.DEFAULTGROUPINGID,
              item.LANG,
              item.CALENDARTYPE,
              item.THEME,
              item.TIMECREATED,
              item.TIMEMODIFIED,
              item.REQUESTED,
              item.ENABLECOMPLETION,
              item.COMPLETIONNOTIFY,
              item.CACHEREV,
              item.ORIGINALCOURSEID,
              item.SHOWACTIVITYDATES,
              item.SHOWCOMPLETIONCONDITIONS
            ])
          })
          console.log('curso creado...')
        }

      }
    }) 
  })

}

/* MDL_COURSE_CO_CATEGORY */
function MDL_COURSE_CO_CATEGORY(){

  cron.schedule('0 22 * * *',() => {
   conn.execute({
      sqlText:`SELECT * FROM  mdl_course_categories_co`,
      complete: (err, stmt, rows) => {
        if(err){
          console.log(err.message)
        }else{
          rows.map(async (item) => {
            await pool.query(`INSERT IGNORE INTO mdl_course_categories_co (id, name, idnumber, description, descriptionformat, parent, sortorder, coursecount, visible, visibleold, timemodified, depth, path, theme) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `,[
              item.ID,
              item.NAME,
              item.IDNUMBER,
              item.DESCRIPTION,
              item.DESCRIPTIONFORMAT,
              item.PARENT,
              item.SORTORDER,
              item.COURSECOUNT,
              item.VISIBLE,
              item.VISIBLEOLD,
              item.TIMEMODIFIED,
              item.DEPTH,
              item.PATH,
              item.THEME
            ])
          }) 
          console.log('curso categoria....')
        }

      }
    }) 
  })

}

/* MDL_CUSTOMCERT_CO */
function MDL_CUSTOMCERT_CO(){

  cron.schedule('0 23 * * *',() => {
   conn.execute({
      sqlText:`SELECT * FROM  mdl_customcert_co`,
      complete: (err, stmt, rows) => {
        if(err){
          console.log(err.message)
        }else{
          rows.map(async (item) => {
            await pool.query(`INSERT IGNORE INTO mdl_customcert_co (id, course, templateid, name, intro, introformat, requiredtime, verifyany, deliveryoption, emailstudents, emailteachers, emailothers, protection, timecreated, timemodified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `,[
              item.ID,
              item.COURSE,
              item.TEMPLATEID,
              item.NAME,
              item.INTRO,
              item.INTROFORMAT,
              item.REQUIREDTIME,
              item.VERIFYANY,
              item.DELIVERYOPTION,
              item.EMAILSTUDENTS,
              item.EMAILTEACHERS,
              item.EMAILOTHERS,
              item.PROTECTION,
              item.TIMECREATED,
              item.TIMEMODIFIED
            ])
          })  
          console.log('CUSTOMCERT AGREGADO...')
        }

      }
    }) 
  })

}

/* MDL_GRADE_ITEMS_CO */
function MDL_GRADE_ITEMS_CO(){

  cron.schedule('0 20 * * *',() => {
   conn.execute({
      sqlText:`SELECT * FROM DIDACTIK.MOODLE_BI.MDL_GRADE_ITEMS_CO b WHERE DATE(TO_TIMESTAMP_NTZ(b.timecreated)) BETWEEN DATEADD(day, -1, DATE(GETDATE())) AND DATE(GETDATE()) OR DATE(TO_TIMESTAMP_NTZ(b.timemodified)) BETWEEN DATEADD(day, -1, DATE(GETDATE())) AND DATE(GETDATE())`,
      complete: (err, stmt, rows) => {
        if(err){
          console.log(err.message)
        }else{
         rows.map(async (item) => {
            await pool.query(`INSERT INTO mdl_grade_items_co (id, courseid, categoryid, itemname, itemtype, itemmodule, iteminstance, itemnumber, iteminfo, idnumber, calculation, gradetype, grademax, grademin, scaleid, outcomeid, gradepass, multfactor, plusfactor, aggregationcoef, aggregationcoef2, sortorder, display, decimals, hidden, locked, locktime, needsupdate, weightoverride, timecreated, timemodified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `,[
              item.ID,
              item.COURSEID,
              item.CATEGORYID,
              item.ITEMNAME,
              item.ITEMTYPE,
              item.ITEMMODULE,
              item.ITEMINSTANCE,
              item.ITEMNUMBER,
              item.ITEMINFO,
              item.IDNUMBER,
              item.CALCULATION,
              item.GRADETYPE,
              item.GRADEMAX,
              item.GRADEMIN,
              item.SCALEID,
              item.OUTCOMEID,
              item.GRADEPASS,
              item.MULTFACTOR,
              item.PLUSFACTOR,
              item.AGGREGATIONCOEF,
              item.AGGREGATIONCOEF2,
              item.SORTORDER,
              item.DISPLAY,
              item.DECIMALS,
              item.HIDDEN,
              item.LOCKED,
              item.LOCKTIME,
              item.NEEDSUPDATE,
              item.WEIGHTOVERRIDE,
              item.TIMECREATED,
              item.TIMEMODIFIED
              
            ])
          })   
          console.log(rows)
          console.log('MDL_GRADE_ITEMS_CO AGREGADO...')
        }

      }
    }) 
  })

}

/* MDL_GRADE_ITEMS_CO */
function MDL_COURSE_MODULES_CO(){

  cron.schedule('0 23 * * *',() => {
   conn.execute({
      sqlText:`SELECT * FROM DIDACTIK.MOODLE_BI.MDL_COURSE_MODULES_CO`,
      complete: (err, stmt, rows) => {
        if(err){
          console.log(err.message)
        }else{
         rows.map(async (item) => {
            await pool.query(`INSERT iGNORE INTO mdl_course_modules_co (id, course, module, instance, section, idnumber, added, score, indent, visible, visibleoncoursepage, visibleold, groupmode, groupingid, completion, completiongradeitemnumber, completionview, completionexpected, showdescription, availability, deletioninprogress) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,[
              item.ID,
              item.COURSE,
              item.MODULE,
              item.INSTANCE,
              item.SECTION,
              item.IDNUMBER,
              item.ADDED,
              item.SCORE,                                                                                      
              item.INDENT,
              item.VISIBLE,
              item.VISIBLEONCOURSEPAGE,
              item.VISIBLEOLD,
              item.GROUPMODE,
              item.GROUPINGID,
              item.COMPLETION,
              item.COMPLETIONGRADEITEMNUMBER,
              item.COMPLETIONVIEW,
              item.COMPLETIONEXPECTED,
              item.SHOWDESCRIPTION,
              item.AVAILABILITY,
              item.DELETIONINPROGRESS
              
            ])
          })  

          console.log('MDL_COURSE_MODULES_CO AGREGADO...')
        }

      }
    }) 
  })

}

function MDL_ENROL_CO(){
  cron.schedule('10 2 * * *',() => {
    conn.execute({
       sqlText:`SELECT * FROM DIDACTIK.MOODLE_BI.MDL_ENROL_CO b WHERE DATE(TO_TIMESTAMP_NTZ(b.timecreated)) BETWEEN DATEADD(day, -2, DATE(GETDATE())) AND DATE(GETDATE()) OR DATE(TO_TIMESTAMP_NTZ(b.timemodified)) BETWEEN DATEADD(day, -2, DATE(GETDATE())) AND DATE(GETDATE())`,
       complete: (err, stmt, rows) => {
         if(err){
           console.log(err.message)
         }else{
          rows.map(async (item) => {
            await pool.query(`INSERT IGNORE INTO mdl_enrol_co (id, enrol, status, courseid, sortorder, name, enrolperiod, enrolstartdate, enrolenddate, expirynotify, expirythreshold, notifyall, password, cost, currency, roleid, customint1, customint2, customint3, customint4, customint5, customint6, customint7, customint8, customchar1, customchar2, customchar3, customdec1, customdec2, customtext1, customtext2, customtext3, customtext4, timecreated, timemodified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,[item.ID,
              item.ENROL,
              item.STATUS,
              item.COURSEID,
              item.SORTORDER,
              item.NAME,
              item.ENROLPERIOD,
              item.ENROLSTARTDATE,
              item.ENROLENDDATE,
              item.EXPIRYNOTIFY,
              item.EXPIRYTHRESHOLD,
              item.NOTIFYALL,
              item.PASSWORD,
              item.COST,
              item.CURRENCY,
              item.ROLEID,
              item.CUSTOMINT1,
              item.CUSTOMINT2,
              item.CUSTOMINT3,
              item.CUSTOMINT4,
              item.CUSTOMINT5,
              item.CUSTOMINT6,
              item.CUSTOMINT7,
              item.CUSTOMINT8,
              item.CUSTOMCHAR1,
              item.CUSTOMCHAR2,
              item.CUSTOMCHAR3,
              item.CUSTOMDEC1,
              item.CUSTOMDEC2,
              item.CUSTOMTEXT1,
              item.CUSTOMTEXT2,
              item.CUSTOMTEXT3,
              item.CUSTOMTEXT4,
              item.TIMECREATED,
              item.TIMEMODIFIED
            ])
          })  
          console.log('rol added ...')
         }

       }
     }) 
   })
}

MDL_SCORM_SCOES_TRACK_CO()
MDL_CUSTOMCERT_ISSUES_CO()
MDL_USER_CO()
MDL_GRADE_GRADES_CO()
MDL_COURSE_CO()
MDL_COURSE_CO_CATEGORY()
MDL_CUSTOMCERT_CO()
MDL_GRADE_ITEMS_CO()
//MDL_COURSE_MODULES_CO()
MDL_ENROL_CO()