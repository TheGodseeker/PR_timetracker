PGDMP     ,    '                |            timetracker    15.6 (Debian 15.6-0+deb12u1)    15.6 (Debian 15.6-0+deb12u1)                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    timetracker    DATABASE     w   CREATE DATABASE timetracker WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'ru_RU.UTF-8';
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
       public         heap    tengu    false            �            1259    16408    timeGaps    TABLE     �   CREATE TABLE public."timeGaps" (
    id bigint NOT NULL,
    "idTask" bigint NOT NULL,
    "idUser" bigint,
    "timeStart" timestamp without time zone NOT NULL,
    "timeFinish" timestamp without time zone
);
    DROP TABLE public."timeGaps";
       public         heap    tengu    false                      0    16399    tasks 
   TABLE DATA           S   COPY public.tasks (id, name, "desc", "expTime", "spentTime", "isDone") FROM stdin;
    public          tengu    false    214   �                 0    16408    timeGaps 
   TABLE DATA           W   COPY public."timeGaps" (id, "idTask", "idUser", "timeStart", "timeFinish") FROM stdin;
    public          tengu    false    215   �       �           2606    16407    tasks tasks_pkey 
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
       public          tengu    false    215    3206    214               	  x��T[R�@�^N�	,!O/�	�� /5V,������B��̍��P�*a������}ҜV<���QLs�"�a�'Қ�x�t��K�=��iw������`8
��|����|��ȥ�o�}y���G]Vf�<��,�L��5Q�b^,X2�G��k��E-C/X�R��z!���~)�2$�is�C����� ��p<��*�Z4��1?d6?�I��j�P����Eu��;h���B㞹b �픓RL��#�lD��.Z��������8]!K�z����� ���ͯ!�H�=O��m��hv�Uť�+�]��_Dٯ�+��g�¨Q�j��S6��&#��pȪ̍�.C_X���).��Zҫ���s�tO�x��^���;�6V&Z��`����Lh�[w���Hc	i+ͶQ#+�L�v������jzT��6>M\�PiC�8=�M��Hc�gI��S�������M����b��z�M�n� ��\�9��\}��         �   x�m���0�PE��Cȉ\D*p�uٞ�zq;��@�QQ[d[ �.����ڱ�&�N�vӥ���L��[gS�?�n�R��&�x#�7��o���7����x�l54=lT�{4�<�x�)M/���ce�ѰH�     