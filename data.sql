SELECT if(a.idnumber=' ',replace(trim(a.username),'ppt',' '),replace(trim(a.idnumber),'ppt',' ')) AS documento, 
            lower(concat(a.firstname,' ', a.lastname)) AS nombres ,
            a.institution AS institucion ,
            a.id AS user_id,
            DATE_FORMAT(TO_TIMESTAMP_NTZ(b.timemodified),'%Y-%m-%d') AS fecha,
            UPPER(b.value)as resultado, if( UPPER(b.value) = 'DIVERGENTE',1, if( UPPER(b.value) = 'ACOMODADOR',2, if( UPPER(b.value) = 'ASIMILADOR',3, if( UPPER(b.value) = 'CONVERGENTE',4,0 ) ) ) )  AS id_resultado
            
            FROM mdl_user_co a
            
            LEFT JOIN mdl_scorm_scoes_track_co b
            ON b.userid = a.id
            
            WHERE  b.scormid = 4670
            AND b.element = 'cmi.interactions_0.student_response'
            AND b.value IS NOT NULL