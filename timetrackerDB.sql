PGDMP         '    	            |            timetracker    15.6 (Debian 15.6-0+deb12u1)    15.6 (Debian 15.6-0+deb12u1)                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                        1262    16398    timetracker    DATABASE     w   CREATE DATABASE timetracker WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'ru_RU.UTF-8';
    DROP DATABASE timetracker;
                tengu    false            �            1259    16399    tasks    TABLE     �   CREATE TABLE public.tasks (
    id bigint NOT NULL,
    name character(50) NOT NULL,
    "desc" text,
    "expTime" bigint DEFAULT 0 NOT NULL,
    "spentTime" bigint DEFAULT 0 NOT NULL,
    "isDone" boolean DEFAULT false NOT NULL
);
    DROP TABLE public.tasks;
       public         heap    tengu    false            �            1259    16408    timeGaps    TABLE       CREATE TABLE public."timeGaps" (
    id bigint NOT NULL,
    "idTask" bigint NOT NULL,
    "idUser" bigint,
    "timeStart" timestamp without time zone NOT NULL,
    "timeFinish" timestamp without time zone,
    "isActive" boolean DEFAULT false NOT NULL
);
    DROP TABLE public."timeGaps";
       public         heap    tengu    false                      0    16399    tasks 
   TABLE DATA           S   COPY public.tasks (id, name, "desc", "expTime", "spentTime", "isDone") FROM stdin;
    public          tengu    false    214                    0    16408    timeGaps 
   TABLE DATA           c   COPY public."timeGaps" (id, "idTask", "idUser", "timeStart", "timeFinish", "isActive") FROM stdin;
    public          tengu    false    215   U       �           2606    16407    tasks tasks_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public            tengu    false    214            �           2606    16412    timeGaps timeGaps_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."timeGaps"
    ADD CONSTRAINT "timeGaps_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."timeGaps" DROP CONSTRAINT "timeGaps_pkey";
       public            tengu    false    215            �           2606    16413    timeGaps idTask    FK CONSTRAINT     s   ALTER TABLE ONLY public."timeGaps"
    ADD CONSTRAINT "idTask" FOREIGN KEY ("idTask") REFERENCES public.tasks(id);
 =   ALTER TABLE ONLY public."timeGaps" DROP CONSTRAINT "idTask";
       public          tengu    false    214    215    3207               B  x��T[r�@�^N�	R	۹DN�o�����$eU\��*����@�^�fn�����Q���LOw�N}��T���T�xY�q�!�=��c͏�f��hCY8z�����4L�O�0L�
)��S~O%�����[D�R�/���]fbn���W�q0{��r�O!X�h�5�A؆�Tix�:�nZ��~c��W����R������+d z~�/CI���;�0G~y�G�()��w{ԮQ�,�ȭ�*/�Az3k٘�~q\�'k��ȷ��Հ��j�$���)��([�!�<g]�~`{��� ʀt%ꍔ 	�n�*������D��^���7��N�]n p��o�ZpT�x�y
�wuT'4�e�E�����m��A	��/;���&�^3C/H�h�����)4��p\�y5I	fk�9���-�=�@ ��C4:��sO�Zf�Q��,Cg��uuD�`�B"�\z��g$���ޙQl��TB����ɻ%wtU�D7_b�hLL
��^Np~��=rओ���upnbr~8��`� Ĺ����28Ǝ���rI����g��WA�Z�*;         �   x�m���0߸�4�8����	gK��/�fA�#,����c�nv߮"$��	�&�������۠C��o���}��?��F��������z!I
�/�:AH����B����­� �p��8?��waU�     