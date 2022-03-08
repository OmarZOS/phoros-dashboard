/*==============================================================*/
/* Nom de SGBD :  MySQL 5.0                                     */
/* Date de cr�ation :  29/01/2022 10:59:40                      */
/*==============================================================*/



drop table if exists USER;

/*==============================================================*/
/* Table : USER                                                 */
/*==============================================================*/
create table USER
(
   ID_USER              bigint not null AUTO_INCREMENT ,
   NOM_USER             varchar(30) not null,
   PRENOM_USER          varchar(30) not null,
   PASSWORD             varchar(512) not null,
   EMAIL                varchar(30) not null,
   TYPE                 varchar(15),
   primary key (ID_USER)
);


