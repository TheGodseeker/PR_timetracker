PGDMP     "                    |            timetracker    15.6 (Debian 15.6-0+deb12u1)    15.6 (Debian 15.6-0+deb12u1)                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    timetracker    DATABASE     w   CREATE DATABASE timetracker WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'ru_RU.UTF-8';
    DROP DATABASE timetracker;
                tengu    false            �            1259    16399    tasks    TABLE     �   CREATE TABLE public.tasks (
    id bigint NOT NULL,
    name character(50) NOT NULL,
    "desc" text,
    "expTime" bigint,
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
       public         heap    tengu    false                      0    16399    tasks 
   TABLE DATA           S   COPY public.tasks (id, name, "desc", "expTime", "spentTime", "isDone") FROM stdin;
    public          tengu    false    214   �                 0    16408    timeGaps 
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
       public          tengu    false    214    215    3205                 x��T[N�0�vN� �>(��|s�/Q	�����QӴu��{#f�Nhh���ʉ�ٙ�#Co4�%��?'�C�iRF[S��RZ� �s~f���1�\����XK	p�(��<��9_�5)�+�/�2��K�����q/)�Q�:���4 Qb].�d	M\���Z��?��"9�&���V,F3Z�Շ�',�cI�E�r<�j��pDS#��2&?�M�v*�п��u��3l۩(˷@�=��F�ߒ\C/��4�+=�,MBQ߶���l���t�K�t��,.�b?XW�v�+m�[����/���}�ʈo�A�ک(�F���^�*�M��z\����g�PD�)�Ur��Qb�Z�SM]YZ"r���"�=�2�*���`ܫ���.�׆\�b��ö���~O]�sdT;�]޿=�ޱ}�U\�g.�+�[����W���8:)��;�v�>���yl��Sh���)m�x�U�
�؇�(NB����(�o���Q         �   x�m���0�PE��Cȉ\D*p�uٞ�zq;��@�QQ[d[ �.����ڱ�&�N�vӥ���L��[gS�?�n�R��&�x#�7��o���7����x�l54=lT�{4�<�x�)M/���ce�ѰH�     