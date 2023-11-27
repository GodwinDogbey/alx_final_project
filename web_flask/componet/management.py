#!/usr/bin/python3
""" Block and Room management"""
from models.room import Room
from web_flask.componet import staff_view
from flask import Blueprint, render_template, request, redirect, url_for
from models.room_type import RoomType
from models.block import Block
from web_flask.forms.block import AddBlock
from web_flask.forms.room_type import AddRoomType
from web_flask.forms.rooms import RoomForm
from models import storage


@staff_view.route('/block')
def BlockManage():
    """ display all blocks """
    form = AddBlock()
    all_bocks = storage.all(Block).values()
    blocks = [block.to_dict() for block in all_bocks]

    return render_template('manageBlock.html',
                           blocks=blocks, form=form)


@staff_view.route('/rooms/add', methods=['GET'], strict_slashes=False)
def room_add():
    """" add room """
    form = RoomForm()
    return render_template('AddRoom.html',
                           form=form)


@staff_view.route('/roomtype', methods=['GET'], strict_slashes=False)
def room_type():
    form = AddRoomType()
    """ display all room types """
    all_types = storage.all(RoomType).values()
    types = [room_type.to_dict() for room_type in all_types]

    return render_template('roomType.html',
                           room_type=types,
                           form=form)


@staff_view.route('/roomtype/add')
def room_type_add():
    form = AddRoomType()
    """" add or edit room type """
    return render_template('addRoomType.html',
                           form=form)


@staff_view.route('/configure')
def configure():
    return render_template('configure.html')


@staff_view.route('/expiry')
def expiry():
    return render_template('expiry.html')


